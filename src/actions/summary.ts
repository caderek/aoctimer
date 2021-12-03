import views from "../views"
import config, { check } from "../config"

const summary = () => {
  if (!check() || !config.benchmark) {
    console.log("Please run 'aoctimer init' first.")
    return
  }

  console.log(views.summary(config.year, config.days))
}

export default summary
