import React from 'react';
import { sortAppointmentsByDay } from '../../Appointments/appointment_selectors';
import { renderStars, degreeCheck } from '../doctor_selectors';
import { getDayRange } from '../doctor_utils';
import DoctorsMapWrapper from './doctors_map';
import DoctorAppointments from './doctor_appointments';
import DoctorReviews from './doctor_reviews';

class Doctor extends React.Component {
  constructor(props) {
    super(props);
    const days = getDayRange();
    this.state = {
      today: days[0],
      tomorrow: days[1],
      dayAfter: days[2],
      dayFour: days[3]
    };
    this.specList = this.specList.bind(this);
  }

  componentDidMount() {
    this.props.getADoctor(this.props.match.params.id);
  }

  specList(specialties) {
    return specialties.map((specialty, idx) => {
      return(<li key={idx}>{`${specialty}`}</li>);
    });
  }

  render() {
    const { doctor, reviews, appointments, googleLoaded } = this.props;
    const { today, tomorrow, dayAfter, dayFour } = this.state;
    const daySortedApps = sortAppointmentsByDay(
      appointments, [today, tomorrow, dayAfter, dayFour]
    );
    return(
      <section>
        <div className="docTitle">
          <h1>
            {`Dr. ${doctor.first_name} ${doctor.last_name}, ${degreeCheck(doctor.degree)}`}
          </h1>
          <div>
            Overall Rating: <span className="stars">{renderStars(doctor.average_rating)}</span>
          </div>
        </div>
        <div className="docMap">
          <DoctorsMapWrapper
            doctors={[doctor]}
            address={doctor.address}
            googleLoaded={googleLoaded}
          />
        </div>
        <div className="doc-inline">
          <div className="docProfile">
            <h2>Qualifications and Expertise</h2>
            <div>
              <div>
                <label>Education:</label>
                <div>{`${doctor.education}`}</div>
              </div>
              <div>
                <label>Specialties:</label>
                <ul>
                  {this.specList(doctor.specialties)}
                </ul>
              </div>
              <div>
                <label>Address:</label>
                <div>{`${doctor.address}`}</div>
              </div>
            </div>
          </div>
          <DoctorAppointments
            apps={daySortedApps}
            address={`${doctor.address}`}
            daysToRender={this.state} />
          <DoctorReviews reviews={reviews} />
        </div>
      </section>
    );
  }
}

export default Doctor;
