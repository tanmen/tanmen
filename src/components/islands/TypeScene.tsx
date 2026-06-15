import { useEffect, useState } from 'react';

/**
 * 旧サイトの useType / useTypeSentence 演出の最小再実装。
 * 本格的なシーン演出は frontend-design フェーズで作り直す。
 */
export default function TypeScene({ text }: { text: string }) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p className="font-mono text-lg text-fg">
      {shown}
      <span className="animate-pulse">▋</span>
    </p>
  );
}
