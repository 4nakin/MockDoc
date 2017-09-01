import { values } from 'lodash';
import moment from 'moment';
import { filter } from 'lodash';

export const selectDoctors = state => values(state.doctors);

export const sortAppointmentsByDoctor = (doctors, appointments) => {
  const sortedAppointments = {};

  if (doctors[0]) {
    doctors.forEach(doctor => {
      sortedAppointments[doctor.id] = filter(
        appointments, ['doctor_id', doctor.id]
      );
    });
  }

  return sortedAppointments;
};

export const sortAppointmentsByDay = (apps, dates) => {
  const appsByDays = [];
  dates.forEach(day => {
    appsByDays.push(filter(apps, (app) => { return(
      moment(app.start_time).format("D") === day.getDate().toString());
    }));
  });
  return appsByDays;
};
