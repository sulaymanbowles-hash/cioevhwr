import re

file_path = '/workspaces/cioevhwr/src/lib/products.ts'

with open(file_path, 'r') as f:
    content = f.read()

# Regex to find the end of a product object and insert the new fields
# We look for the closing brace of an object in the allProducts array
# This is a bit tricky with regex. 

# Alternative: Read line by line.
new_lines = []
in_all_products = False
brace_count = 0

lines = content.split('\n')
for i, line in enumerate(lines):
    if 'export const allProducts: Product[] = [' in line:
        in_all_products = True
    
    if in_all_products:
        # Check if this line is the end of an object "  },"
        if line.strip() == '},' or line.strip() == '}':
            # Check if the previous lines already have condition/certs
            # This is a simple heuristic. 
            # We can just check if "condition:" is in the previous few lines.
            # But since I already updated the first few, I need to be careful.
            
            # Let's look back a few lines
            has_condition = False
            for j in range(1, 10):
                if i - j >= 0:
                    if 'condition:' in lines[i-j]:
                        has_condition = True
                        break
                    if '{' in lines[i-j]: # Start of object
                        break
            
            if not has_condition:
                # Insert fields before this line
                new_lines.append('    condition: "FN",')
                new_lines.append('    certs: ["mfg_cert", "8130-3"]')
        
    new_lines.append(line)

with open(file_path, 'w') as f:
    f.write('\n'.join(new_lines))
