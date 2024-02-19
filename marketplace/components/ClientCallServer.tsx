'use client';

import { useState } from "react";

export default function ClientCallServer({ id, action }: { id: number }) {
  const [count, setCount] = useState(66);
  return (
    <div>
      <h3>ClientCallServer</h3>
      <button onClick={(formData) => action(count)}>
        Call! {id}
      </button>
    </div>
  );
}
