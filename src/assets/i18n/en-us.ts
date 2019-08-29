import * as copyrightLicense from '../licences/copyright_en.txt';
import * as worldMusic from './labels/word_music.json';

const translation: any = {
  agree: 'Agree',
  cancel: 'Cancel',
  copyrightLicense: copyrightLicense.default,
  copyrightWorkshop: 'Copyright Experiment (Workshop)',
  copyrightFull: 'Copyright Experiment (Full)',
  consonance: 'Consonance',
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
  username: 'Username',
  usernameAlert: 'You Must Have a Username to Continue.',
  usernamePrompt: 'Pick Your Unique Username',
  usernameConflict: 'Username Exsisted. Do you want to Continue previous Experiment?',
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
