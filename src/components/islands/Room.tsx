import { motion } from 'motion/react';

/**
 * 「部屋を探索する」アニメーションのプレースホルダ island。
 * 本実装は別PCの ComfyUI で生成するドット絵3Dアニメ（WebM / sprite sheet）を
 * ここに読み込む想定（docs/reborn-architecture.md / ComfyUI 指示文を参照）。
 */
export default function Room() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-6 flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-surface"
    >
      <p className="text-sm text-muted">room exploration animation — coming soon</p>
    </motion.div>
  );
}
