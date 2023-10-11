export const logger = (req, res, next) => {
    const date = new Date();
    const formattedDate =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
       +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const log = `[${formattedDate}] ${method}:${url} ${status}`;
    console.log(log);
    next();
  };