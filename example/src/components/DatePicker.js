import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import moment from 'moment';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: null,
            selectedSlot: null,
            validDay: false,
            validSlot: false,
            availableslots: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '17:00'],
        }
        this.nextPage = this.props.nextPage.bind(this);
        this.closeModal = this.props.closeModal.bind(this);
        this.previous = this.props.previous.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleSlotClick = this.handleSlotClick.bind(this);
        this.contractorAvailabilitySlots = this.contractorAvailabilitySlots.bind(this);
        this.validate = this.validate.bind(this);
    }
    handleDayClick(day, { selected }) {
        this.setState({
            selectedDay: selected ? undefined : day,
            validDay: false
        });
    }
    handleSlotClick(slot) {
        this.setState({
            selectedSlot: slot,
            validSlot: false
        });
    }

    componentDidMount() {
        this.contractorAvailabilitySlots();
    }

    contractorAvailabilitySlots() {
        let _self = this, data = [];
        fetch('/contractor/availability/5d1350199880ff94115dedde', {
            method: "get"
        }).then(function (res) {
            return res.json();
        }).then(function (result) {
            if (result.response && result.response.time_slots) {
                data = result.response.time_slots.map(function (d) {
                    return d.slot
                })
            }
            _self.setState({
                availableslots: data
            })
        })
    }
    validate() {
        if (!this.state.selectedDay) {
            this.setState({ validDay: true })
        } else if (!this.state.selectedSlot) {
            this.setState({ validSlot: true })
        }
    }

    render() {
        switch (this.props.calenderIndex) {
            case 1: return <Calenderpicker validate={this.validate} validDay={this.state.validDay}
                selectedDay={this.state.selectedDay} handleDayClick={this.handleDayClick}
                nextPage={this.nextPage} closeModal={this.closeModal} />
            case 2: return <TimeSlot previous={this.previous} validate={this.validate}
                validSlot={this.state.validSlot} selectedSlot={this.state.selectedSlot}
                selectedDay={this.state.selectedDay}
                nextPage={this.nextPage.bind(this, this.state.selectedDay, this.state.selectedSlot)}
                slots={this.state.availableslots} handleSlotClick={this.handleSlotClick}
                selectedSlot={this.state.selectedSlot} />
            case 3: return (
                <div>
                    <div className="time-booking-final">Thank you. your slot is booked</div>
                    <div className="booking-buttons align-text-center align-button-bottom">
                        <button className="submit" onClick={this.closeModal}>stäng</button>
                    </div>
                </div>
            )
        }
    }
}

function Calenderpicker(props) {
    const date = new Date(),
        StartDate = new Date(date.getFullYear(), date.getMonth() - 1, 0).getDate();

    return (
        <div>
            <div className="col-md-12 align-text-center padding1">Välj datum</div>
            <div className="col-md-12 datepicker-boking">
                <DayPicker
                    month={new Date()}
                    selectedDays={props.selectedDay}
                    onDayClick={props.handleDayClick}
                    disabledDays={[
                        {
                            after: new Date(date.getFullYear(), date.getMonth() - 1, StartDate),
                            before: new Date(),
                        },
                    ]}
                />
                <div className="col-md-12">
                    {props.validDay ? (
                        <div className="validation border-none">Please select available Date</div>
                    ) : (null)}
                </div>
            </div>
            <div className="col-md-12 booking-buttons panding_no">
                <button className="submit f-left" onClick={props.closeModal}>Avbryt</button>
                {(props.selectedDay) ? (
                    <button className="submit" onClick={props.nextPage}>Nästa</button>
                ) : (
                        <button className="submit" onClick={props.validate}>Nästa</button>
                    )
                }
            </div>
        </div>
    )
}

function TimeSlot(props) {
    let data = moment(props.selectedDay).format("MMMM Do YYYY");    
    return (
        <div className="" >
            <div className="col-md-12 align-text-center padding1" >Välj tid</div>
            <div className="col-md-12 align-text-center">{data}</div>
            <div className="col-md-12 align-text-center slots-centering padding-bottom-none">
                <div className="row" style={{ maxHeight: '300px', minHeight: '240px', overflowY: 'auto' }}>
                    {props.slots.map(function (time, index) {
                        return (
                            <div key={index} className="col-md-4" onClick={props.handleSlotClick.bind(this, time)}>
                                {props.selectedSlot === time ? (
                                    <p className="selectcard-bg available-slots">{time}</p>)
                                    : (
                                        <p className="available-slots">{time}
                                        </p>
                                    )}
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className="col-md-12">
                {props.validSlot ? (
                    <div className="validation border-none">Please select available time slot</div>
                ) : (null)}
            </div>
            <div className="booking-buttons col-md-12 panding_no">
                <button className="submit f-left" onClick={props.previous}>Föregående</button>
                {(props.selectedSlot) ? (
                    <button className="submit" onClick={props.nextPage}>Nästa</button>
                ) : (
                        <button className="submit" onClick={props.validate}>Nästa</button>
                    )
                }
            </div>
        </div>
    )
}

export default DatePicker