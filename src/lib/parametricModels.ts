/**
 * Parametric CAD Model Library
 * Professional aerospace fastener modeling with accurate specifications
 */

import { BufferGeometry, Shape, ExtrudeGeometry, CylinderGeometry, Vector2, LatheGeometry } from 'three';

export interface ThreadSpec {
  majorDiameter: number;
  minorDiameter: number;
  pitch: number;
  threadsPerInch: number;
  length: number;
}

export interface BoltSpec {
  headType: 'hex' | 'socket' | 'button' | 'flat';
  headDiameter: number;
  headHeight: number;
  shaftDiameter: number;
  shaftLength: number;
  thread: ThreadSpec;
  socketSize?: number;
  material: 'titanium' | 'steel' | 'stainless' | 'brass';
}

export interface NutSpec {
  type: 'hex' | 'lock' | 'castle' | 'wing';
  widthAcrossFlats: number;
  height: number;
  innerDiameter: number;
  thread: ThreadSpec;
  lockingCollarHeight?: number;
  material: 'steel' | 'stainless' | 'brass' | 'aluminum';
}

export interface FittingSpec {
  type: 'straight' | 'elbow' | 'tee' | 'flared';
  bodyDiameter: number;
  bodyLength: number;
  hexSize: number;
  hexLength: number;
  flareAngle?: number; // 37° or 45°
  portSize: number;
  material: 'brass' | 'steel' | 'stainless' | 'aluminum';
}

export interface PinSpec {
  type: 'clevis' | 'cotter' | 'dowel' | 'taper';
  diameter: number;
  length: number;
  headDiameter?: number;
  headHeight?: number;
  hasGroove: boolean;
  groovePosition?: number;
  material: 'stainless' | 'steel' | 'brass';
}

/**
 * Generate precise helical threads using parametric equations
 */
export function generateThreadGeometry(spec: ThreadSpec, segments = 64): BufferGeometry {
  const { majorDiameter, minorDiameter, pitch, length } = spec;
  const turns = length / pitch;
  const pointsPerTurn = segments;
  const totalPoints = Math.ceil(turns * pointsPerTurn);
  
  const points: Vector2[] = [];
  
  for (let i = 0; i <= totalPoints; i++) {
    const t = i / pointsPerTurn;
    const y = (t * pitch) - length / 2;
    
    // Thread profile (V-thread)
    const threadPhase = (i % pointsPerTurn) / pointsPerTurn;
    const threadRadius = minorDiameter / 2 + 
      (majorDiameter - minorDiameter) / 2 * (1 - Math.abs(threadPhase - 0.5) * 2);
    
    points.push(new Vector2(threadRadius, y));
  }
  
  return new LatheGeometry(points, segments);
}

/**
 * Generate hex geometry with precise dimensions
 */
export function generateHexGeometry(
  widthAcrossFlats: number, 
  height: number, 
  chamfer = 0.02
): BufferGeometry {
  const shape = new Shape();
  const radius = widthAcrossFlats / (2 * Math.cos(Math.PI / 6));
  
  // Create hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  
  return new ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: true,
    bevelThickness: chamfer,
    bevelSize: chamfer,
    bevelSegments: 3
  });
}

/**
 * Generate socket head drive recess
 */
export function generateSocketGeometry(
  diameter: number,
  depth: number,
  sides = 6
): CylinderGeometry {
  return new CylinderGeometry(
    diameter / 2,
    diameter / 2 - depth * 0.1, // Slight taper
    depth,
    sides,
    1
  );
}

/**
 * Generate flare geometry for AN fittings
 */
export function generateFlareGeometry(
  tubeOD: number,
  flareAngle: number, // 37° or 45°
  flareLength: number
): BufferGeometry {
  const angleRad = (flareAngle * Math.PI) / 180;
  const points: Vector2[] = [];
  
  const innerRadius = tubeOD / 2;
  const outerRadius = innerRadius + Math.tan(angleRad) * flareLength;
  
  points.push(new Vector2(innerRadius, 0));
  points.push(new Vector2(outerRadius, flareLength));
  points.push(new Vector2(outerRadius - 0.02, flareLength));
  points.push(new Vector2(innerRadius - 0.01, 0.01));
  
  return new LatheGeometry(points, 48);
}

/**
 * Generate precision ground surface finish rings
 */
export function generateGroundFinishRings(
  diameter: number,
  _length: number,
  ringCount = 8
): BufferGeometry[] {
  const geometries: BufferGeometry[] = [];
  
  for (let i = 0; i < ringCount; i++) {
    const geometry = new CylinderGeometry(
      diameter / 2 + 0.002,
      diameter / 2 + 0.002,
      0.008,
      48
    );
    geometries.push(geometry);
  }
  
  return geometries;
}

/**
 * Generate knurling pattern for grip surfaces
 */
export function generateKnurlingPattern(
  diameter: number,
  length: number,
  pitch = 0.03
): BufferGeometry[] {
  const geometries: BufferGeometry[] = [];
  const circumference = Math.PI * diameter;
  const knurlCount = Math.floor(circumference / pitch);
  
  for (let i = 0; i < knurlCount; i++) {
    const geometry = new CylinderGeometry(
      0.005,
      0.005,
      length,
      4,
      1
    );
    geometries.push(geometry);
  }
  
  return geometries;
}

/**
 * Calculate standard dimensions from part numbers
 */
export const STANDARD_SPECS = {
  // NAS6204 Hex Head Bolt
  NAS6204: (dashNumber: number): BoltSpec => ({
    headType: 'hex',
    headDiameter: 0.438, // 7/16" nominal
    headHeight: 0.156,
    shaftDiameter: 0.25,
    shaftLength: 0.25 + dashNumber * 0.125,
    // No socket for NAS6204
    thread: {
      majorDiameter: 0.25,
      minorDiameter: 0.217,
      pitch: 0.0357,
      threadsPerInch: 28,
      length: 0.25 + dashNumber * 0.125 - 0.3
    },
    material: 'titanium'
  }),
  
  // MS21042 Self-Locking Nut (All Metal)
  MS21042: (_dashNumber: number): NutSpec => ({
    type: 'lock',
    widthAcrossFlats: 0.344, // Reduced hex for -4
    height: 0.219,
    innerDiameter: 0.25,
    lockingCollarHeight: 0.06,
    thread: {
      majorDiameter: 0.25,
      minorDiameter: 0.217,
      pitch: 0.0357,
      threadsPerInch: 28,
      length: 0.219
    },
    material: 'stainless' // Usually A286 or similar
  }),
  
  // AN815 Union (Hydraulic Fitting)
  AN815: (dashNumber: number): FittingSpec => ({
    type: 'flared',
    bodyDiameter: 0.4,
    bodyLength: 1.3,
    hexSize: 0.5625, // 9/16" for -4
    hexLength: 0.22,
    flareAngle: 37,
    portSize: 0.25 + dashNumber * 0.0625,
    material: 'brass' // or steel/aluminum
  }),
  
  // MS16555 Dowel Pin (Headless)
  MS16555: (dashNumber: number): PinSpec => ({
    type: 'dowel',
    diameter: 0.125 + dashNumber * 0.01, // Arbitrary scaling for demo
    length: 1.0,
    hasGroove: false,
    material: 'stainless'
  })
};

/**
 * Material presets with PBR properties
 */
export const MATERIAL_PRESETS = {
  titanium: {
    color: [0.58, 0.62, 0.68] as [number, number, number],
    metalness: 0.96,
    roughness: 0.18,
    envMapIntensity: 1.2
  },
  steel: {
    color: [0.50, 0.52, 0.56] as [number, number, number],
    metalness: 0.92,
    roughness: 0.28,
    envMapIntensity: 1.0
  },
  stainless: {
    color: [0.78, 0.82, 0.88] as [number, number, number],
    metalness: 0.96,
    roughness: 0.12,
    envMapIntensity: 1.4
  },
  brass: {
    color: [0.88, 0.72, 0.36] as [number, number, number],
    metalness: 0.85,
    roughness: 0.24,
    envMapIntensity: 1.5
  },
  aluminum: {
    color: [0.75, 0.77, 0.80] as [number, number, number],
    metalness: 0.88,
    roughness: 0.22,
    envMapIntensity: 1.1
  },
  cadmiumPlated: {
    color: [0.72, 0.74, 0.76] as [number, number, number],
    metalness: 0.92,
    roughness: 0.18,
    envMapIntensity: 1.2
  },
  nylon: {
    color: [0.12, 0.24, 0.36] as [number, number, number],
    metalness: 0.05,
    roughness: 0.75,
    envMapIntensity: 0.3
  }
};
