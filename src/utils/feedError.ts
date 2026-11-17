/**
 * フィードを取得できなかったときの扱い。
 * 本番ビルドでは例外を投げてビルドを失敗させる(記事が空のまま本番を上書きせず、前回のデプロイを残すため)。
 * 開発中はオフラインでも作業できるよう、警告だけ出して空で続ける
 */
export function handleFeedError(name: string, error: unknown): [] {
  if (import.meta.env.PROD) {
    throw new Error(`${name} のフィードを取得できませんでした`, {
      cause: error,
    });
  }
  console.warn(`${name} のフィードを取得できませんでした(空で続行):`, error);
  return [];
}
