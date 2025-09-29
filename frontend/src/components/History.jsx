import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { Link } from "react-router-dom";

const History = () => {
  const [records, setRecords] = useState(null);

  const getRecords = async () => {
    try {
      const res = await axios.get("/api/history");
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/history/${id}`);

      const newRecords = records.filter(rec => rec._id !== id);

      setRecords(newRecords);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecords();
  }, [])

  if (!records || records.length === 0) return (
    <>
      <div className="flex justify-between border border-gray-300 px-8 py-6 bg-white shadow-xl rounded-lg max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-semibold underline">No records</h1>
        <div>
          <Link
            to="/"
            className="bg-lime-500 hover:bg-lime-400 focus:bg-lime-400 text-white text-lg px-6 py-3 rounded-full mr-5 shadow-lg transition-all"
          >
            Back
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="border border-gray-300 px-8 py-6 bg-white shadow-xl rounded-lg max-w-4xl mx-auto mt-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold underline">History</h1>
        <div>
          <Link
            to="/"
            className="bg-lime-500 hover:bg-lime-400 focus:bg-lime-400 text-white text-lg px-6 py-3 rounded-full mr-5 shadow-lg transition-all"
          >
            Back
          </Link>
        </div>
      </div>
      <table className="table-auto text-center w-full">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="p-2">No</th>
            <th className="p-2">Wallet Account</th>
            <th className="p-2">Percent</th>
            <th className="p-2">Score</th>
            <th className="p-2">Category</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Date</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            return (
              <tr key={index}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{record.account.slice(0, 7) + "..." + record.account.slice(-5)}</td>
                <td className="p-2">{record.score/record.quantity*100+" %"}</td>
                <td className="p-2">{record.score}</td>
                <td className="p-2">{record.category}</td>
                <td className="p-2">{record.quantity}</td>
                <td className="p-2">{moment(record.createdAt).format('YYYY.MM.DD HH:mm')}</td>
                <td className="p-2">
                  <button className="px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-400"
                    onClick={() => {
                      handleDelete(record._id);
                    }
                    }
                  >Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

}

export default History;