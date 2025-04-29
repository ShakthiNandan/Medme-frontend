// src/utils/getMarkersByMenu.ts
export type Marker = {
  label: string;
  coords: [number, number, number];
  tooltipData: any;
  id?: string;
};

export function getMarkersByMenu(menu: string): Marker[] {
  switch (menu) {
    case 'bio':
      return [
        { label: 'Head', coords: [0, 1.8, 0], tooltipData: { name: 'John Doe', photo: '/john.jpg' } },
        { label: 'Body', coords: [0, 1.2, 0], tooltipData: { name: 'John Doe', age: 30 } },
        { label: 'Legs', coords: [0, 0.6, 0], tooltipData: { name: 'John Doe', history: 'No issues' } },
      ];
    case 'emergencies':
      return [
        { label: 'Arm Fracture', coords: [0.3, 1.3, 0], tooltipData: { type: 'Compound Fracture' } },
        { label: 'Pain Score Chest', coords: [0, 1.2, 0.1], tooltipData: { painScore: 7 } },
      ];
    case 'vitals':
      return [
        { label: 'Heart Rate', coords: [0, 1.3, 0], tooltipData: { bpm: 72 } },
        { label: 'Temperature', coords: [0, 1.8, 0.1], tooltipData: { temp: '37.0°C' } },
      ];
    case 'historical':
      return [
        { label: 'X-Ray 2023', coords: [0.2, 1.1, 0], tooltipData: { scan: 'chest-xray-2023.png' } },
      ];
    default:
      return [];
  }
}
