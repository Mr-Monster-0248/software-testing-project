import axios from 'axios';
import connect, { sql } from '@databases/sqlite';

const client = axios.create({
  baseURL: 'http://127.0.0.1:5678',
});

const db = connect('./backend/db.sqlite3');

describe('Employee tests', () => {
  let employeeID = 0;

  it('should add an employee to the DB', async () => {
    const newEmployee = {
      name: 'qwer',
      email: 'qwer',
      address_line1: 'qwer',
      address_line2: 'qwer',
      city: 'qwer',
      zip_code: '1234',
      hiring_date: 'qwer',
      job_title: 'qwer',
    };

    // building the params of the query
    const params = new URLSearchParams();
    params.append('name', newEmployee.name);
    params.append('email', newEmployee.email);
    params.append('address_line1', newEmployee.address_line1);
    params.append('address_line2', newEmployee.address_line2);
    params.append('city', newEmployee.city);
    params.append('zip_code', newEmployee.zip_code);
    params.append('hiring_date', newEmployee.hiring_date);
    params.append('job_title', newEmployee.job_title);

    // request to add employee to the db
    await client.post('add_employee', params);

    // retreving info of the last employee added
    const sqlQuery = sql`
      SELECT
        E.id,
        name,
        email,
        address_line1,
        address_line2,
        city,
        zip_code,
        job_title,
        hiring_date
      FROM [hr_employee] E
      JOIN hr_basicinfo B ON B.id = E.basic_info_id
      JOIN hr_contract C ON C.id = E.contract_id`;
    const employee = (await db.query(sqlQuery)).pop();

    employeeID = employee.id;
    const finalEmployee = { id: employeeID, ...newEmployee };

    expect(employee).toEqual(finalEmployee);
  });

  it('should edit an employee in the DB', async () => {
    const newBasic = {
      name: 'flud',
      email: 'flud',
    };

    // building the params of the query
    const params = new URLSearchParams();
    params.append('name', newBasic.name);
    params.append('email', newBasic.email);

    // request to add employee to the db
    await client.post(`employee/${employeeID}/basic`, params);

    // retreving info of the last employee added
    const sqlQuery = sql`
      SELECT
        name,
        email
      FROM [hr_employee] E
      JOIN hr_basicinfo B ON B.id = E.basic_info_id
      JOIN hr_contract C ON C.id = E.contract_id
      WHERE E.id = ${employeeID}`;
    const employeeBasic = (await db.query(sqlQuery)).pop();

    expect(employeeBasic).toEqual(newBasic);
  });

  it('should delete employee', async () => {
    await client.delete(`employee/delete/${employeeID}`);

    const sqlQuery = sql`
      SELECT COUNT(*) AS exist
      FROM hr_employee
      WHERE id == ${employeeID}`;
    const { exist } = (await db.query(sqlQuery)).pop();

    expect(exist).toEqual(0);
  });
});
