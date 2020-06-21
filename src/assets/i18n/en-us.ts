import * as copyrightLicense from '../licences/copyright_en.txt';
import * as worldMusic from './labels/word_music.json';

const translation: any = {
  agree: 'Agree',
  beautiful0: 'Very not beautiful',
  beautiful1: 'Not beautiful',
  beautiful2: 'Beautiful',
  beautiful3: 'Very beautiful',
  beautifulQuestion: 'Is it beautiful?',
  cancel: 'Cancel',
  copyrightLicense: copyrightLicense.default,
  copyrightNewWorkshop: 'Copyright Experiment (New Workshop)',
  copyrightWorkshop: 'Copyright Experiment (Workshop)',
  copyrightFull: 'Copyright Experiment (Full)',
  consonance: 'Consonance',
  consonant0: '',
  consonant1: '',
  consonant2: '',
  consonant3: '',
  consonantQuestion: 'Is it consonant',
  continue: 'Continue',
  creativity: 'Familiarity',
  decoration: 'Ornamentation',
  different: 'Different',
  emotion: 'Valence',
  evaluationToSimilarity: 'Evaluation Finished, Go to Similarity Test',
  excitingness: 'Excitement',
  experimentFinished: 'Experiment Finished',
  groove: 'Grooviness',
  home: 'Home',
  identical: 'Identical',
  infringe: 'Infringe',
  infringeQuestion: 'Do you think B violate the infringement of A?',
  likeness: 'Preference',
  lyrics: 'Lyrics',
  notInfringe: 'Not Infringe',
  overlap: 'Texture',
  pleasant0: '',
  pleasant1: '',
  pleasant2: '',
  pleasant3: '',
  pleasantQuestion: '',
  progress: 'Progress',
  quality: 'Sound Quality',
  range: 'Pitch',
  records: 'Records',
  requirementsNotMatch: 'The requirements of this experiment don\'t match',
  rhythm: 'Rhythm',
  similar0: 'Not at all similar',
  similar1: 'A Little similar',
  similar2: 'Somewhat similar',
  similar3: 'Very similar',
  similar4: 'Extremely similar',
  similarity: 'Similarity',
  similarityQuestion: 'Do you think A and B are similar?',
  submit: 'Submit',
  tempo: 'Tempo',
  timbre: 'Timbre',
  username: 'ID',
  usernameAlert: 'You Must Have an ID to Continue.',
  usernamePrompt: 'Pick Your Unique ID',
  usernameConflict: 'ID exsists. Do you want to Continue previous Experiment?',
  worldMusic: 'World Music Experiment',
  worldMusicWorkshop: 'World Music Experiment (Workshop)',
  worldMusicWorkshopSimilarity: 'World Music Experiment (Workshop, Pairwise)',
  worldMusicWorkshopRank: 'World Music Experiment (Workshop, Triplet)',
  worldMusicYamaha: 'World Music Experiment（Yamaha）',
};

const worldMusicJson = worldMusic.default as any[];

worldMusicJson.forEach((item) => {
  translation[`worldMusicFeature${item.ID}`] = item['Feature Name EN'] as string;
  translation[`worldMusicLow${item.ID}`] = item['Low EN'] as string;
  translation[`worldMusicMedium${item.ID}`] = item['Medium EN'] as string;
  translation[`worldMusicHigh${item.ID}`] = item['High EN'] as string;
  translation[`worldMusicExplanation${item.ID}`] = item['Explanation EN'] as string;
});

export default translation;
