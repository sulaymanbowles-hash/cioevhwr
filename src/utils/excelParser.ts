export interface ParsedPart {
  partNumber: string;
  quantity: number;
}

export const parseExcelFile = async (file: File): Promise<ParsedPart[]> => {
  // Dynamically import xlsx to reduce initial bundle size
  const XLSX = await import('xlsx');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to array of arrays to analyze structure
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        
        if (jsonData.length === 0) {
          resolve([]);
          return;
        }

        const parsedParts: ParsedPart[] = [];
        
        // Smart detection logic
        let partColIndex = -1;
        let qtyColIndex = -1;
        let startRowIndex = 0;

        // Helper to clean strings
        const cleanStr = (s: any) => String(s || '').toLowerCase().trim();

        // 1. Try to find headers with more robust keywords
        for (let i = 0; i < Math.min(jsonData.length, 10); i++) {
          const row = jsonData[i];
          if (!row || row.length === 0) continue;

          for (let j = 0; j < row.length; j++) {
            const cell = cleanStr(row[j]);
            
            // Part Number Keywords
            if (['part', 'pn', 'p/n', 'sku', 'item', 'number', 'part number', 'part_number', 'material', 'code', 'product'].some(k => cell === k || cell.includes(k))) {
              // Avoid false positives like "Part Description" if we already found a better match, but for now simple is okay
              if (partColIndex === -1) partColIndex = j;
            }
            
            // Quantity Keywords
            if (['qty', 'quantity', 'count', 'amount', 'pieces', 'units', 'qnty', 'req'].some(k => cell === k || cell.includes(k))) {
              if (qtyColIndex === -1) qtyColIndex = j;
            }
          }
          
          if (partColIndex !== -1 || qtyColIndex !== -1) {
            // If we found at least one header, we assume this is the header row
            startRowIndex = i + 1;
            break;
          }
        }

        // 2. Deep Content Analysis if headers failed or partial
        if (partColIndex === -1 || qtyColIndex === -1) {
           const colStats: { [key: number]: { 
             numericCount: number, 
             stringCount: number, 
             partNumberLikeCount: number,
             totalCount: number 
           } } = {};

           // Analyze first 20 rows of data (skipping potential header rows if we guessed wrong)
           const analysisRows = jsonData.slice(0, 20);
           
           analysisRows.forEach(row => {
             row.forEach((cell, idx) => {
               if (!colStats[idx]) colStats[idx] = { numericCount: 0, stringCount: 0, partNumberLikeCount: 0, totalCount: 0 };
               
               const strVal = String(cell).trim();
               if (!strVal) return;
               
               colStats[idx].totalCount++;

               // Check for numeric (Quantity candidate)
               // Allow "10", "10.0", "1,000"
               const numVal = parseFloat(strVal.replace(/,/g, ''));
               if (!isNaN(numVal) && isFinite(numVal)) {
                 colStats[idx].numericCount++;
               } else {
                 colStats[idx].stringCount++;
               }

               // Check for Part Number candidate (Alphanumeric, dashes, slashes)
               // e.g. "NAS123", "AN-4-5", "MS20470"
               if (/^[a-zA-Z0-9\-\/\.]+$/.test(strVal) && /[a-zA-Z]/.test(strVal) && /[0-9]/.test(strVal)) {
                  colStats[idx].partNumberLikeCount++;
               }
             });
           });

           // Guess Quantity: Column with highest percentage of numbers
           if (qtyColIndex === -1) {
             let maxNumericRatio = -1;
             Object.entries(colStats).forEach(([idx, stats]) => {
               if (stats.totalCount < 3) return; // Ignore sparse columns
               const ratio = stats.numericCount / stats.totalCount;
               if (ratio > maxNumericRatio) {
                 maxNumericRatio = ratio;
                 qtyColIndex = parseInt(idx);
               }
             });
           }

           // Guess Part Number: Column with highest "Part Number Like" score, or just strings
           if (partColIndex === -1) {
             let maxPartScore = -1;
             Object.entries(colStats).forEach(([idx, stats]) => {
               const colIdx = parseInt(idx);
               if (colIdx === qtyColIndex) return; // Don't pick the same column
               
               // Score based on part-number-like patterns + general stringiness
               const score = (stats.partNumberLikeCount * 2) + stats.stringCount;
               
               if (score > maxPartScore) {
                 maxPartScore = score;
                 partColIndex = colIdx;
               }
             });
           }
           
           // If we had to guess based on content, assume data starts at row 0 (unless we found a header row earlier)
           if (startRowIndex === 0) startRowIndex = 0;
        }

        // Fallback defaults
        if (partColIndex === -1) partColIndex = 0;
        if (qtyColIndex === -1) qtyColIndex = 1;

        // Extract data
        for (let i = startRowIndex; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (!row || row.length === 0) continue;

          const rawPart = row[partColIndex];
          const rawQty = row[qtyColIndex];

          if (rawPart) {
            const partNumber = String(rawPart).trim();
            
            // Skip if part number looks like a header or empty
            if (!partNumber || partNumber.toLowerCase() === 'part number' || partNumber.length < 2) continue;

            // Try to parse quantity
            let quantity = 1;
            if (rawQty) {
              const strQty = String(rawQty).replace(/[^0-9\.]/g, '');
              const parsed = Math.floor(parseFloat(strQty)); // Force integer
              if (!isNaN(parsed) && parsed > 0) {
                quantity = parsed;
              }
            }

            parsedParts.push({ partNumber, quantity });
          }
        }

        resolve(parsedParts);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
