import { strict } from "assert";
import { DbCallback } from "../types/Types";

const sql = require("./db");

export default class Domain {
  name: string;
  date: string;
  isValid: number;

  constructor(name: string, date: string, isValid: number) {
    this.name = name;
    this.date = date;
    this.isValid = isValid;
  }

  async create(newDomain: Domain, result: DbCallback) {
    await sql.query(
      "INSERT INTO domains (name, date, is_valid) VALUES (?, ?, ?)",
      [newDomain.name, newDomain.date, newDomain.isValid],
      (err: any, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created domain: ", { id: res.insertId, ...newDomain });
        result(null, { id: res.insertId, ...newDomain });
      });
  };

  static async getDomains(page:number, limit:number, result: DbCallback) {
    await sql.query(
      "SELECT * FROM domains limit ?, ?",
      [page * limit, limit],
      (err: any, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("customers: ", res);
        result(null, res);
      });
  };

  static async getDomainCount(result: DbCallback) {
    await sql.query(
      "SELECT count(*) AS count FROM domains",
      (err: any, res: any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("customers: ", res);
        result(null, res[0]);
      });
  };

  static async removeAll(result: DbCallback) {
    await sql.query("TRUNCATE TABLE domains", (err: any, res: any) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log(`deleted ${res.affectedRows} domains`);
      result(null, res);
    });
  };
}

// const Domain = function (domain) {
//   this.name = domain.name;
//   this.date = domain.date;
//   this.is_valid = domain.is_valid;
// };

// Domain.create = async (newDomain, result) => {
//   await sql.query("INSERT INTO domains (name, date, is_valid) VALUES (?, ?, ?)", [newDomain.name, newDomain.date, newDomain.is_valid], (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created domain: ", { id: res.insertId, ...newDomain });
//     result(null, { id: res.insertId, ...newDomain });
//   });
// };

// Domain.getAll = async result => {
//   await sql.query("SELECT * FROM domains", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("customers: ", res);
//     result(null, res);
//   });
// };

// Domain.removeAll = async result => {
//   await sql.query("TRUNCATE TABLE domains", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} domains`);
//     result(null, res);
//   });
// };

// module.exports = Domain;
