import dogGif from '../imports/konomi_neon_loop.gif';
import mouseGif from '../imports/mouse_beat_neon_loop.gif';
import experimentImage from '../imports/image-5.png';

// Career-only editorial content. Confirm draft positioning and tools before job applications.
// No employer, tenure, team size, proficiency score, or commercial outcome is inferred.
export const profile = {
  name: 'YUKI HARA',
  role: 'PROJECT MANAGER',
  github: 'https://github.com/harayuki415',
  email: null as string | null, // Set only to a verified address. Null shows an honest contact notice.
  intro: '課題をほどき、認識を揃え、手を動かして前に進める。',
  about: 'プロジェクトを進めることと、自分でつくること。その両方を大切にしています。Webやゲームの個人開発、AIを使った試作を通じて、技術の可能性と制作工程の難しさを自分の手で確かめる。その理解を、仕様の整理やチームとの対話、次の判断につなげていきます。',
};

export const strengths = [
  { title: 'PROJECT MANAGEMENT', subtitle: 'プロジェクトを前に進める', description: '要件整理、進行管理、リスク管理、関係者調整。目的と制約を捉え、実行できる計画へ。' },
  { title: 'PRODUCT / DIRECTION', subtitle: 'つくるべきものを見極める', description: '課題と仕様を整理し、優先順位を設計。ユーザーの体験から、判断の軸をつくる。' },
  { title: 'TECHNICAL UNDERSTANDING', subtitle: '自分で触れて、理解する', description: 'Web、JavaScript、Three.js、Unity、Blender。試作を通じて、実装と制作工程への理解を深める。' },
  { title: 'AI & PROTOTYPING', subtitle: '小さくつくり、早く確かめる', description: '生成AIやAIコーディングツールを活用。アイデアを動く形にし、試して、見直す。' },
];

export type Project = {
  id: string; name: string; kind: string; image: string; alt: string;
  tagline: string; overview: string; role: string;
  why: string; problem: string; approach: { title: string; description: string }[];
  result: string; tech: string[]; github: string; live: string;
};

// Facts checked against the public dogdash/music repositories and existing portfolio.
// Why/Problem are editorial framing of the implementation, not a claim about interviews or research.
export const projects: Project[] = [
  {
    id: 'dog-dash', name: 'Dog Dash', kind: 'BROWSER GAME / PERSONAL PROJECT',
    image: dogGif, alt: 'Dog Dash：ネオンのコースを走る犬の3Dゲーム画面',
    tagline: 'つくった世界を、遊べる体験へ。',
    overview: '犬のキャラクターを操作し、障害物を避けながら骨を集めるブラウザ向け3Dランナー。モデル、アニメーション、操作、音を、一つのプレイ体験として組み合わせた個人制作です。',
    role: '個人開発 / ゲーム実装・体験の調整',
    why: '3D表現を眺めるだけでなく、操作して楽しめる体験にする。キャラクターの動きとプレイヤーへの反応を、ブラウザ上でつなぐ試み。',
    problem: '見た目、操作感、実行環境の安定性をどう両立するか。3Dモデルの読み込みや入力方法の違いも、プレイ体験に影響する。',
    approach: [
      { title: '操作と動きをつなぐ', description: 'AnimationMixerとクロスフェードで動作を切り替え、キーボードとタッチの両方に操作を用意。' },
      { title: '失敗時も体験を止めない', description: 'モデルの読み込み失敗時には代替形状を表示。Three.jsを同梱し、外部CDNへの実行時依存を減らす構成。' },
      { title: '次のプレイにつなげる', description: '衝突や収集に音・パーティクルで反応を返し、ベストスコアをlocalStorageに保存。' },
    ],
    result: 'GitHub Pagesでプレイ可能な形として公開。3Dアセットからゲームループ、入力、フィードバックまでを統合した実装を、デモとソースコードで確認できます。',
    tech: ['JavaScript', 'Three.js / WebGL', 'FBX / AnimationMixer', 'Web Audio API', 'GitHub Pages'],
    github: 'https://github.com/harayuki415/dogdash', live: 'https://harayuki415.github.io/dogdash/',
  },
  {
    id: 'mouse-beat', name: 'Mouse Beat', kind: 'RHYTHM GAME / PERSONAL PROJECT',
    image: mouseGif, alt: 'Mouse Beat：ネオンのターゲットをクリックするリズムゲーム画面',
    tagline: 'シンプルな入力に、手応えを。',
    overview: 'タイミングに合わせてターゲットをクリックし、コンボとスコアを伸ばすブラウザリズムゲーム。入力、判定、音、ビジュアルの関係を扱った個人制作です。',
    role: '個人開発 / 入力・判定・演出の実装',
    why: 'クリックという身近な操作から、リズムに乗る楽しさをつくる。小さな操作に対して、分かりやすい反応を返す試み。',
    problem: '判定結果をどう直感的に伝えるか。入力のタイミングと、画面・音のフィードバックが一つの体験として伝わる必要がある。',
    approach: [
      { title: '入力の結果を見える形に', description: 'タイミングに応じた判定、スコア、コンボを表示し、音と2Dエフェクトを組み合わせる。' },
      { title: '関心ごとを分ける', description: 'ゲーム進行と判定をgame.js、3D表示をdog3d.jsに分離。3Dモデルを読み込めない場合には代替表示を用意。' },
    ],
    result: 'ブラウザで遊べるゲームとして公開。入力から結果表示までの流れと、ベストスコアの保存を実装しています。',
    tech: ['JavaScript', 'Three.js', 'Web Audio API', 'Canvas 2D', 'localStorage'],
    github: 'https://github.com/harayuki415/music', live: 'https://harayuki415.github.io/music/',
  },
];

export const experiments = [
  { name: 'Air, Still', kind: 'VISUAL EXPLORATION', image: experimentImage, alt: '青空と犬のキャラクターのビジュアル', description: 'キャラクターと風景のビジュアルスタディ。', path: 'work/air-still' },
];

export const process = [
  { title: 'DEFINE', subtitle: '曖昧さを、扱える形へ。', description: '要求を目的・スコープ・制約に分解し、何を決めるべきかを明確にする。', output: '目的 / 要件 / 完了条件' },
  { title: 'ALIGN', subtitle: '違う視点を、同じ方向へ。', description: '開発・企画・デザイン・関係者の前提を揃え、判断の理由を共有する。', output: '共通認識 / 役割 / 判断基準' },
  { title: 'DRIVE', subtitle: '次の一歩を、止めない。', description: '課題・リスク・依存関係を可視化し、優先順位を更新しながら進行する。', output: '課題管理 / リスク / 優先順位' },
  { title: 'IMPROVE', subtitle: '振り返りを、次の実行へ。', description: 'プロセスやコミュニケーションの詰まりを見つけ、小さな改善を続ける。', output: '振り返り / 改善案 / 検証' },
];

// User-supplied example categories. These are draft tools, not verified years/proficiency.
export const tools = [
  { category: 'Management', context: '整理・共有・進行', items: ['JIRA', 'Confluence', 'GitHub', 'Slack'] },
  { category: 'Development', context: '実装・試作', items: ['JavaScript', 'TypeScript', 'Three.js', 'Unity'] },
  { category: '3D / Creative', context: '表現・制作', items: ['Blender', 'Figma', 'After Effects'] },
  { category: 'AI', context: '発想・試作・検証', items: ['ChatGPT', 'Codex', 'AI prototyping tools'] },
];
