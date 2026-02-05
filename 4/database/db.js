import db from "./database.js";

export const TelepulesToDiak = (telepules) => {
      return db
            .prepare(
                  `
      SELECT diakok.*
      FROM diakok
      WHERE diakok.telepules = ?
    `,
            )
            .all(telepules);
};

export const angolTanora = () => {
      return db
            .prepare(
                  `
      SELECT datum, terem, orasorszam
      FROM orak
      WHERE targy = 'angol'
      ORDER BY datum , orasorszam
    `,
            )
            .all();
};

export const matekfizika9 = () => {
      return db
            .prepare(
                  `
                SELECT csoport, targy, datum FROM orak WHERE (targy = 'matek' OR targy = 'fizika') AND csoport LIKE '%9%' ORDER BY targy`,
            )
            .all();
};
