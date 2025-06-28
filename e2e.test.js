const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./main');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('E2E Appointment Flow', () => {
  let studentA1 = { name: 'A1', email: 'a1@example.com', password: 'passA1' };
  let studentA2 = { name: 'A2', email: 'a2@example.com', password: 'passA2' };
  let professorP1 = { name: 'P1', email: 'p1@example.com', password: 'passP1' };
  let tokens = {};
  let professorId;
  let slot1 = new Date(Date.now() + 3600 * 1000).toISOString();
  let slot2 = new Date(Date.now() + 7200 * 1000).toISOString();
  let appointmentIdA1;

  it('Register and login Student A1', async () => {
    await request(app).post('/auth/student/sregister').send(studentA1);
    const res = await request(app).post('/auth/student/slogin').send({ email: studentA1.email, password: studentA1.password });
    expect(res.body.token).toBeDefined();
    tokens.A1 = res.body.token;
  });

  it('Register and login Professor P1', async () => {
    await request(app).post('/auth/professor/pregister').send(professorP1);
    const res = await request(app).post('/auth/professor/plogin').send({ email: professorP1.email, password: professorP1.password });
    expect(res.body.token).toBeDefined();
    tokens.P1 = res.body.token;
    // Get professorId for later
    const jwt = require('jsonwebtoken');
    professorId = jwt.decode(tokens.P1).id;
  });

  it('Professor P1 sets availability', async () => {
    const res = await request(app)
      .post('/availability')
      .set('Authorization', `Bearer ${tokens.P1}`)
      .send({ timeSlots: [slot1, slot2] });
    expect(res.body.availability).toContain(slot1);
    expect(res.body.availability).toContain(slot2);
  });

  it('Student A1 views available slots for P1', async () => {
    const res = await request(app)
      .get(`/availability/${professorId}`)
      .set('Authorization', `Bearer ${tokens.A1}`);
    expect(res.body).toContain(slot1);
    expect(res.body).toContain(slot2);
  });

  it('Student A1 books appointment for slot1', async () => {
    const res = await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${tokens.A1}`)
      .send({ professorId, time: slot1 });
    expect(res.body.message).toMatch(/booked/i);
    appointmentIdA1 = res.body.appointment._id;
  });

  it('Register and login Student A2', async () => {
    await request(app).post('/auth/student/sregister').send(studentA2);
    const res = await request(app).post('/auth/student/slogin').send({ email: studentA2.email, password: studentA2.password });
    expect(res.body.token).toBeDefined();
    tokens.A2 = res.body.token;
  });

  it('Student A2 books appointment for slot2', async () => {
    const res = await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${tokens.A2}`)
      .send({ professorId, time: slot2 });
    expect(res.body.message).toMatch(/booked/i);
  });

  it('Professor P1 cancels appointment with A1', async () => {
    const res = await request(app)
      .delete(`/appointment/${appointmentIdA1}`)
      .set('Authorization', `Bearer ${tokens.P1}`);
    expect(res.status).toBe(204);
  });

  it('Student A1 checks their appointments (should be empty)', async () => {
    const res = await request(app)
      .get('/appointment/my')
      .set('Authorization', `Bearer ${tokens.A1}`);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
}); 