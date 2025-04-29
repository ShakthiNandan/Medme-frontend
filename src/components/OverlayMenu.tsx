// src/components/OverlayMenu.tsx
import React from 'react';
import './OverlayMenu.css';

const options = [
  { key: 'bio', label: 'Bio Data' },
  { key: 'emergencies', label: 'Emergencies' },
  { key: 'vitals', label: 'Vitals' },
  { key: 'historical', label: 'Historical Data' },
];

interface Props {
  selected: string;
  onSelect: (key: string) => void;
}

const OverlayMenu: React.FC<Props> = ({ selected, onSelect }) => (
  <div className="overlay-menu">
    {options.map(opt => (
      <button
        key={opt.key}
        className={selected === opt.key ? 'active' : ''}
        onClick={() => onSelect(opt.key)}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export default OverlayMenu;
