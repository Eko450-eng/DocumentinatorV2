export const trimmer = (word: string) => {
  // Remove äüö
  let noÄ = word.replaceAll(/ä/gimu, 'aE')
  let noÜ = noÄ.replaceAll(/ü/gimu, 'uE')
  let noÖ = noÜ.replaceAll(/ö/gimu, 'oE')
  let noß = noÖ.replaceAll(/ß/gimu, 'ss')
  let noAt = noß.replaceAll(/@/gimu, '')
  let noDot = noAt.replaceAll(/\./gimu, '')

  // Remove spaces
  return noDot.replace(/ /g, "_")
}

export const untrimmer = (word: string) => {
  // ReAdd äüö
  let noÄ = word.replaceAll(/aE/gimu, 'ä')
  let noÜ = noÄ.replaceAll(/uE/gimu, 'ü')
  let noÖ = noÜ.replaceAll(/oE/gimu, 'ö')
  // ReAdd spaces

  return noÖ.replace(/_/g, " ")
}
