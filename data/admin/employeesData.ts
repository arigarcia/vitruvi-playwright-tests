export let COMPANY = {
    id: 0,
    name: 'Contractor with Employees AT',
    code: 'CNTEMP-1',
    description: 'Contractor Description Test 2',
    phone1: '96325874',
    phone2: '14785236', 
    email: 'at-playwright-test@example.com', 
    address1: 'Laprida 642701', 
    address2: 'Congreso 234', 
    zipcode: '4400', 
    city: 'Tucuman', 
    region: 'Center', 
    country: 'Canada',
    type: 'SC'
}

export let SUPERVISOR = {
    company: -1,
    companyName: COMPANY.name,
    id: -1,
    employee_id: '9878',
    first_name: 'Do not update',
    last_name: 'Supervisor user',
    email: 'testsub-ari@gmail.com',
    phone1: '1232131',
    phone2: '9878',
    address1: 'Main St 123',
    address2: 'Second St 456',
    post_code: '5000',
    city: 'Salta',
    region: 'Salta',
    country: 'Argentina',
    division: 'The best',
    notes: 'Testing notes',
    hourly_rate: 0,
    overtime_rate: 50,
    qualifications: [],
    user_tier: 'Field User',
    supervisor: null
}

export let ADD_EMPLOYEE = {
    company: -1,
    companyName: COMPANY.name,
    id: -1,
    employee_id: '559632',
    first_name: 'Do not update',
    last_name: 'Subcontractor Employee',
    email: 'sub-aabril@gmail.com',
    phone1: '1232131',
    phone2: '9878',
    address1: 'Main St 123',
    address2: 'Second St 456',
    post_code: '5000',
    city: 'Salta',
    region: 'Salta',
    country: 'Argentina',
    roles: [' 5G-WP', 'CAD Technician'],
    division: 'The best',
    notes: 'Testing notes',
    hourly_rate: '5.00',
    overtime_rate: '50.00',
    qualifications: [],
    user_tier: 'Field User',
    supervisor: `${SUPERVISOR.first_name} ${SUPERVISOR.last_name} (${SUPERVISOR.email})`
}

export let EMPLOYEE_TO_UPDATE = {
    company: -1,
    companyName: COMPANY.name,
    id: -1,
    employee_id: 'EMPUPDAT3',
    first_name: 'Update Employee',
    last_name: 'Test',
    email: 'updateemployee@test.com',
    phone1: '387512344',
    phone2: '4242349',
    address1: 'Main St 123',
    address2: 'Second St 456',
    post_code: '5000',
    city: 'Salta',
    region: 'Salta',
    country: 'Argentina',
    //roles: [' 5G-WP', 'CAD Technician'],
    division: 'The best',
    notes: 'Testing notes',
    hourly_rate: 5,
    overtime_rate: 50,
    qualifications: [],
    user_tier: 'Field User',
    supervisor: null
}

export let EMPLOYEE_UPDATED = {
    company: -1,
    companyName: COMPANY.name,
    id: -1,
    employee_id: 'EMPUPDAT3D',
    first_name: 'Updated Employee',
    last_name: 'Test',
    email: 'updatedemployee@test.com',
    phone1: '0115435345',
    phone2: '0115323443',
    address1: 'Main St 123',
    address2: 'Second St 456',
    post_code: '5000',
    city: 'Capital Federal',
    region: 'Buenos Aires',
    country: 'Argentina',
    roles: [' Project Manager', ' Construction Supervisor'],
    division: 'Testing division',
    notes: 'Notes for test',
    hourly_rate: 2,
    overtime_rate: 10,
    qualifications: [],
    user_tier: 'Office User',
    supervisor: null
}

export let EMPLOYEE_TO_DELETE = {
    company: -1,
    companyName: COMPANY.name,
    id: -1,
    employee_id: 'EMPD3L3T3D',
    first_name: 'Employee to Delete',
    last_name: 'Test',
    email: 'employeetodelete@test.com',
    phone1: '0115435345',
    phone2: '0115323443',
    address1: 'Main St 123',
    address2: 'Second St 456',
    post_code: '5000',
    city: 'Capital Federal',
    region: 'Buenos Aires',
    country: 'Argentina',
    division: 'Testing division',
    notes: 'Notes for test',
    hourly_rate: 2,
    overtime_rate: 10,
    qualifications: [],
    user_tier: 'Office User',
    supervisor: null
}