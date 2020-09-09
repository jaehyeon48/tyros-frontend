import axios from 'axios';
import SERVER_URL from '../actions/serverURL';

export const get10DaysOfRecord = async () => {
  const config = { withCredentials: true };

  try {
    const recordData = await axios.get(`${SERVER_URL}/api/record/10days`, config);

    return convertToDateString(recordData.data.records);
  } catch (error) {
    console.error(error);
  }
}

const convertToDateString = (records) => {
  records.forEach((record) => {
    record.recordDate = new Date(record.recordDate).toDateString().slice(4, 10)
  });

  return records;
}