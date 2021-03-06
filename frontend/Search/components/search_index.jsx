import React from 'react';
import DoctorsMapWrapper from '../../Doctors/components/doctors_map';
import { getDayRange } from '../../Doctors/doctor_utils';
import { Loading, NoResultsFound } from './loading_status';
import SearchIndexItem from './search_index_item';

class SearchIndex extends React.Component {
  constructor(props) {
    super(props);
    const days = getDayRange();
    this.state = {
      today: days[0],
      tomorrow: days[1],
      dayAfter: days[2],
    };
  }

  componentDidMount() {
    const queryString = "?".concat(window.location.href.split('?')[1]);
    const searchParams = new URLSearchParams(queryString);
    const filter = {
      specialty: searchParams.get('specialty'),
      address: searchParams.get('address'),
      status: this.props.filter.status,
    };
    this.props.changeFilter(filter);
    this.props.getDoctors(filter);
  }
  
  render() {   
    const { status, address, googleLoaded } = this.props.filter;
    if (status === "loading") {
      return <Loading />;
    } else if (status === "failure"){
        return <NoResultsFound />;
    } else {
      const { appointments, doctors } = this.props;
      const { today, tomorrow, dayAfter }  = this.state;
      return(
        <div className="search-master">
          <section className="search-results">
            <div className="appointment-scroll">
              <button>&#129092;</button>
              <div>{`${today}`.slice(0, 10)}</div>
              <div>{`${tomorrow}`.slice(0, 10)}</div>
              <div>{`${dayAfter}`.slice(0, 10)}</div>
              <button className="right-button">&#129094;</button>
            </div>       
            <ul>
              {doctors.map(doctor => (
                <SearchIndexItem
                  key={doctor.id}
                  doc={doctor}
                  apps={appointments[doctor.id]}
                  dates={[today, tomorrow, dayAfter]} />))}
            </ul>
          </section>
          <DoctorsMapWrapper
            doctors={doctors}
            address={address}
            googleLoaded={googleLoaded}
          />
        </div>
      );
    }
  }
}

export default SearchIndex;
