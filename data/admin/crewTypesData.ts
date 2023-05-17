const ADD_CREW_TYPE = {
    name: 'crew type test AT',
    code: 'AT-123',
    leadRole: '5G-WP',
    description: 'desc',
    roles: ['5G-LEAD', 'Sales Engineer'], 
    equipmentType: ['Backhoe', 'Hydrovac'],
    defaultVelocity: '20'
}

const CREW_TYPE_TO_UPDATE = {
    "id": -1,
    "name": "CREW_TYPE_TEST",
    "code": "CTTEST",
    "lead_role": 39,
    "description": "DESC",
    "roles": [23],
    "equipment_categories": [13],
    "default_velocity": "4"
}

const CREW_TYPE_UPDATED = {
    name: 'crew type test AT to update',
    code: 'AT-123456',
    leadRole: '5G-WP',
    description: 'description',
    roles: ['5G-LEAD', 'Sales Engineer'], 
    equipmentType: ['Backhoe', 'Hydrovac'],
    defaultVelocity: '7'
}

const CREW_TYPE_TO_DELETE = {
    "id": -1,
    "name": "DELETE_CREW_TYPE",
    "code": "CT-D",
    "lead_role": 39,
    "description": "DESC",
    "roles": [23],
    "equipment_categories": [13],
    "default_velocity": "4"
}

export { ADD_CREW_TYPE, CREW_TYPE_TO_UPDATE, CREW_TYPE_UPDATED, CREW_TYPE_TO_DELETE }