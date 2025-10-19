import config from "../src/utils/config";
import logger from "../src/utils/logger";
import app from "./app";

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
