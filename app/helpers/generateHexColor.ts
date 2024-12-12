function randHex() {
  return (Math.floor(Math.random() * 56) + 200).toString(16)
}

export default function randColor() {
  return randHex() + '' + randHex() + '' + randHex()
}
