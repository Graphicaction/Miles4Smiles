export default function validateUpdateChallenge(time) {
  if (time === '') return 0;
  else if (!/^(([0-9]|0[0-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]?)$/.test(time))
    return 0;
  else return 1;
}
