export default function validateChallenge(name, miles, donation, business) {
  if (name === '' || miles === '' || donation === '' || business === '')
    return 0;
  else if (!/^[0-9]*$/g.test(miles) || !/^[0-9]*$/g.test(donation)) return 0;
  else return 1;
}
