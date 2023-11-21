export function DateCalculator(date: string) {
  let timeElapsed = Date.now() - Date.parse(date);
  let timeElapsed_inminutes = Math.ceil(timeElapsed / 86400);
  let timeElapsed_inhours = Math.ceil(timeElapsed / 3600000);
  let timeElapsed_indays = Math.ceil(timeElapsed_inhours / 24);

  if (timeElapsed_inminutes < 60) return `${timeElapsed_inminutes} minutes ago`;
  if (timeElapsed_inminutes > 60 && timeElapsed_inhours < 23)
    return `${timeElapsed_inhours} hours ago`;
  if (timeElapsed_indays <= 30)
    return `${timeElapsed_indays} ${
      timeElapsed_indays === 1 ? "day" : "days"
    } ago`;
  else if (timeElapsed_indays / 30 > 1 && timeElapsed_indays / 365 < 1)
    return `${Math.floor(timeElapsed_indays / 30)} ${
      Math.floor(timeElapsed_indays / 30) ? "month" : "months"
    } ago`;
  else if (timeElapsed_indays / 365 >= 1)
    return `${Math.floor(timeElapsed_indays / 365)} ${
      Math.floor(timeElapsed_indays / 365) === 1 ? "year" : "years"
    } ago`;
}
