import { useEffect, useState } from 'react';

/**
 * フォスファー・プロンプト風のタイピング演出。
 * 旧サイトの useType / useTypeSentence を最小再実装。
 */
export default function TypeScene({ text }: { text: string }) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 85);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p className="font-mono text-base text-fg sm:text-lg">
      <span className="text-phosphor">❯ </span>
      <span>{shown}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  );
}
