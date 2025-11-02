import set from 'lodash/set';
import { QID_TO_PATH } from './qidToPath';

// Builder
export function buildClinicalPayloadFromQIds({
  answersByQId = {},
  selectedQIds = [],
  templateVersion = 1,
}) {
  const payload = {};
  for (const [qidStr, value] of Object.entries(answersByQId)) {
    const qid = Number(qidStr);
    const path = QID_TO_PATH[qid];
    if (!path) continue;
    set(payload, path, value);
  }
  return {
    payload,
    meta: {
      answersByQId,
      selectedQIds,
      templateVersion,
    },
  };
}
