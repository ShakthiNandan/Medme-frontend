// src/components/InjuriesMenu/OpenFracture.tsx
import React, { useState } from 'react';

const OpenFracture: React.FC = () => {
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    // In a real app, you might call a context method or dispatch to add to the timeline
    alert(`Open Fracture saved. Notes: ${notes}`);
  };

  return (
    <div>
      <h2>Open Fracture</h2>
      <p>Details about the open fracture...</p>
      <label>
        Notes:
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default OpenFracture;
