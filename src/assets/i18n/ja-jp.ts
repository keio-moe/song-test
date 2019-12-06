import * as copyrightLicense from '../licences/copyright_jp.txt';
import * as worldMusic from './labels/word_music.json';

const translation: any = {
  agree: '同意する',
  cancel: 'キャンセル',
  beautiful0: 'とても美しくない',
  beautiful1: '美しくない',
  beautiful2: '美しい',
  beautiful3: 'とても美しい',
  beautifulQuestion: 'どれくらい美しいですか？',
  copyrightLicense: copyrightLicense.default,
  copyrightWorkshop: '知的財産権実験（ワークショップ）',
  copyrightFull: '知的財産権実験（完全版）',
  consonance: '協和音',
  consonant0: 'とても非協和的',
  consonant1: '非協和的',
  consonant2: '協和的',
  consonant3: 'とても協和的',
  consonantQuestion: 'どれくらい協和的ですか？',
  continue: '続く',
  creativity: '新規性',
  decoration: '装飾',
  different: '似ていない',
  emotion: '情動',
  excitingness: '興奮度',
  experimentFinished: '実験が終わりました。',
  groove: 'グルーヴ',
  home: 'ホーム',
  identical: '似ている',
  infringe: '侵害する',
  infringeQuestion: 'BがAの著作権を侵害していると思いますか？',
  likeness: '好み',
  lyrics: '歌詞',
  notInfringe: '侵害しない',
  overlap: '音の重なり度合い',
  pleasant0: 'とても心地よくない',
  pleasant1: '心地よくない',
  pleasant2: '心地良い',
  pleasant3: 'とても心地良い',
  pleasantQuestion: 'どれくらい心地良いですか？',
  progress: '進捗率',
  quality: '音質',
  range: '音程',
  records: '録音',
  rhythm: 'リズム',
  similar0: '全く似ていない',
  similar1: 'あまり似ていない',
  similar2: 'どちらとも言えない',
  similar3: 'よく似ている',
  similar4: '非常に似ている',
  similarity: '類似性',
  similarityQuestion: 'AとBの類似性を判断してください',
  submit: '送信',
  tempo: 'テンポ',
  timbre: '音色',
  username: 'ID',
  usernameAlert: 'ID を入力してください。',
  usernamePrompt: 'ID を入力してください。',
  worldMusic: 'ワールドミュージック実験',
  worldMusicWorkshop: 'ワールドミュージック実験',
  worldMusicYamaha: 'ワールドミュージック実験（Yamaha）',
};

const worldMusicJson = worldMusic.default as any[];

worldMusicJson.forEach((item) => {
  translation[`worldMusicFeature${item.ID}`] = item['Feature Name JP'] as string;
  translation[`worldMusicLow${item.ID}`] = item['Low JP'] as string;
  translation[`worldMusicMedium${item.ID}`] = item['Medium JP'] as string;
  translation[`worldMusicHigh${item.ID}`] = item['High JP'] as string;
  translation[`worldMusicExplanation${item.ID}`] = item['Explanation JP'] as string;
});

export default translation;
