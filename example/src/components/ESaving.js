import React, { Component } from 'react';
import CountUp from 'react-countup';
let annualOutput, solarRadiation = 0.9, powerLoss = 0.9,
    reducedPower = 0.9, yearlySavingsdata = [], breakpoint = true;

class ESaving extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lifeTimeSaving: 0,
            breakEvenYr: 8,
            electricityRateIncrease: 2 + '%',
            electricityPerkw: 1.54,
            firstYrSaving: 0.0,
            minimumPackets: 0,
            maximumPackets: 0,
            customPacket: "Specify Number of panels",
            selectedPacket: 'Custom paket',
            };
        this.panelsArray = [];
        this.soltakPanelsArray=[]
        this.initalSumUp = this.initalSumUp.bind(this);
        this.decrement = this.decrement.bind(this);
        this.increment = this.increment.bind(this);
        this.elprisökningChange = this.elprisökningChange.bind(this);
        this.elprisChange = this.elprisChange.bind(this);
        this.packetsWithCount = this.packetsWithCount.bind(this)
        if (this.props.location.includes('Stockholm')) {
            solarRadiation = 1000;
        } else if (this.props.location.includes('Västerbotten')) {
            solarRadiation = 825;
        } else if (this.props.location.includes('Norrbotten')) {
            solarRadiation = 775;
        } else if (this.props.location.includes('Uppsala')) {
            solarRadiation = 95;
        } else if (this.props.location.includes('Södermanland')) {
            solarRadiation = 85;
        } else if (this.props.location.includes('Östergötland')) {
            solarRadiation = 975;
        } else if (this.props.location.includes('Jönköping')) {
            solarRadiation = 925;
        } else if (this.props.location.includes('Kronoberg')) {
            solarRadiation = 925;
        } else if (this.props.location.includes('Kalmar')) {
            solarRadiation = 950;
        } else if (this.props.location.includes('Gotland')) {
            solarRadiation = 1025;
        } else if (this.props.location.includes('Blekinge')) {
            solarRadiation = 975;
        } else if (this.props.location.includes('Skåne')) {
            solarRadiation = 1000;
        } else if (this.props.location.includes('Halland')) {
            solarRadiation = 1000;
        } else if (this.props.location.includes('Västra Götaland')) {
            solarRadiation = 950;
        } else if (this.props.location.includes('Värmland')) {
            solarRadiation = 950;
        } else if (this.props.location.includes('Örebro')) {
            solarRadiation = 950;
        } else if (this.props.location.includes('Västmanland')) {
            solarRadiation = 975;
        } else if (this.props.location.includes('Dalarna')) {
            solarRadiation = 950;
        } else if (this.props.location.includes('Gävleborgd')) {
            solarRadiation = 950;
        } else if (this.props.location.includes('Västernorrland')) {
            solarRadiation = 900;
        } else if (this.props.location.includes('Jämtland')) {
            solarRadiation = 900;
        } else {
            solarRadiation = 900;
        }
    }

    componentDidMount() {
        this.packetsWithCount();
        this.initalSumUp();

    }

    packetsWithCount() {
        var maxPacket, minPacket, Standardpacket;
        function degrees_to_radians(degrees) {
            var pi = Math.PI;
            return degrees * (pi / 180);
        }
        this.soltakPanelsArray = [
            {packet: 'Small paket', count: Math.floor(parseInt(this.calculateRoofArea('Small paket',roofArea)))},
            {packet: 'Standard paket', count: Math.floor(parseInt(this.calculateRoofArea('Standard paket',roofArea)))},
            {packet: 'Max paket', count: Math.floor(parseInt(this.calculateRoofArea('Max paket',roofArea)))},
            {packet:'Custom paket', count : 'Specify the area of solar roof'}
        ];
        var roofArea = parseInt(this.props.roofarea) / Math.cos(degrees_to_radians(parseInt(this.props.roof_pitch)));
        if (roofArea > 400) {
            this.panelsArray = [];
            Standardpacket = 100;
            minPacket = 12;
            this.panelsArray = [
                { packet: 'Small paket', count: parseInt(minPacket) },
                { packet: 'Standard paket', count: parseInt(Standardpacket) },
                { packet: this.state.selectedPacket, count: this.state.customPacket }
            ]
            this.state.maximumPackets = parseInt(Standardpacket);
            this.state.minimumPackets = parseInt(minPacket);
        } else if (roofArea < 400 && roofArea > 200) {
            this.panelsArray = [];
            maxPacket = 100
            Standardpacket = parseInt(roofArea / 4);
            minPacket = 12;
            this.panelsArray = [
                { packet: 'Small paket', count: parseInt(minPacket) },
                { packet: 'Standard paket', count: parseInt(Standardpacket) },
                { packet: 'Max paket', count: parseInt(maxPacket) },
                { packet: this.state.selectedPacket, count: this.state.customPacket }
            ]
            this.state.maximumPackets = parseInt(maxPacket);
            this.state.minimumPackets = parseInt(minPacket);
        } else if (roofArea < 200 && roofArea > 36) {
            this.panelsArray = [];
            maxPacket = parseInt(roofArea / 2);
            Standardpacket = (1 / 2) * maxPacket;
            minPacket = 12;
            this.panelsArray = [
                { packet: 'Small paket', count: parseInt(minPacket) },
                { packet: 'Standard paket', count: parseInt(Standardpacket) },
                { packet: 'Max paket', count: parseInt(maxPacket) },
                { packet: this.state.selectedPacket, count: this.state.customPacket }
            ]
            this.state.maximumPackets = parseInt(maxPacket);
            this.state.minimumPackets = parseInt(minPacket);
        } else if (roofArea < 36 && roofArea > 26) {
            this.panelsArray = [];
            Standardpacket = parseInt(roofArea / 2);
            minPacket = 12;
            this.panelsArray = [
                { packet: 'Small paket', count: parseInt(minPacket) },
                { packet: 'Standard paket', count: parseInt(Standardpacket) },
                { packet: this.state.selectedPacket, count: this.state.customPacket }
            ]
            this.state.maximumPackets = parseInt(Standardpacket);
            this.state.minimumPackets = parseInt(minPacket);
        } else if (roofArea < 26) {
            this.panelsArray = [];
            Standardpacket = 12;
            this.panelsArray = [
                { packet: 'Standard paket', count: parseInt(Standardpacket) },
                { packet: this.state.selectedPacket, count: this.state.customPacket }
            ]
            this.state.maximumPackets = parseInt(Standardpacket);
            this.state.minimumPackets = parseInt(Standardpacket);
        }
    }
    calculateRoofArea(name,roofArea) {
        var smallRoofArea = 0;
        var normalRoofArea = 0;
        function degrees_to_radians(degrees) {
            var pi = Math.PI;
            return degrees * (pi / 180);
        }
        if(name === 'Small paket') {
            var roofArea = parseInt(this.props.roofarea) / Math.cos(degrees_to_radians(parseInt(this.props.roof_pitch)));
            smallRoofArea = (roofArea * 25)/100;
            normalRoofArea = (roofArea * 75)/100;
        }
        if(name === 'Standard paket') {
            var roofArea = parseInt(this.props.roofarea) / Math.cos(degrees_to_radians(parseInt(this.props.roof_pitch)));
            smallRoofArea = (roofArea * 50)/100;
            normalRoofArea = (roofArea * 50)/100;
        }
        if(name === 'Max paket') {
            var roofArea = parseInt(this.props.roofarea) / Math.cos(degrees_to_radians(parseInt(this.props.roof_pitch)));
            smallRoofArea = (roofArea * 100)/100;
            normalRoofArea = (roofArea * 25)/100 ;
        }
        sessionStorage.setItem('roofAreaPkt',JSON.stringify({
            smallRoofArea : smallRoofArea,
            normalRoofArea: normalRoofArea
        }))
        
       return normalRoofArea;
    }

    initalSumUp() {
        var primarySideAnualOutput, secondarySideAnnualOutput,
            primarySideRadiation, secondarySideRadiation, primarySidePanels, secondarySidePanels = 0,
            installedPowerOnPrimarySide, installedPowerOnSecondarySide,
            direction =this.props.direction.replace(/[0-9 ]/g, '');
        if (direction == 'VÄST' || direction == 'OST') {//west east
            primarySideRadiation = 0.85;
            secondarySideRadiation = 0.65;
        } else if (direction == 'SYDVÄST') {//southwest
            primarySideRadiation = 0.95;
            secondarySideRadiation = 0.65;
        } else if (direction == 'SYD') {//south
            primarySideRadiation = 1;
            secondarySideRadiation = 0.60;
        } else if (direction == 'SYDOST') {//southeast
            primarySideRadiation = 0.95;
            secondarySideRadiation = 0.65;
        }
        if (this.panelsArray.length) {
            var _self = this;
            let pannelName =sessionStorage.getItem('pannelName');
            var packetValuesObject;
            if(pannelName=='solpanel'){
                 packetValuesObject = _self.panelsArray.filter(function (packetObj) {
                    return packetObj.packet === _self.props.packetName
                })
            }
            else{
                 packetValuesObject = _self.soltakPanelsArray.filter(function (packetObj) {
                    return packetObj.packet === _self.props.packetName
                })
            }
            
            if (packetValuesObject[0].packet == 'Small paket' || packetValuesObject[0].packet == 'Standard paket') {
                primarySidePanels = this.props.noOfPanels;
            } else if (packetValuesObject[0].packet == 'Max paket') {
                primarySidePanels = this.props.noOfPanels / 2;
                secondarySidePanels = this.props.noOfPanels / 2;
            } else if (packetValuesObject[0].packet == 'Custom paket') {
                if (this.props.noOfPanels > this.panelsArray[1].count) {
                    primarySidePanels = this.panelsArray[1].count;
                    secondarySidePanels = this.props.noOfPanels - this.panelsArray[1].count
                } else if (this.props.noOfPanels == this.panelsArray[1].count || this.props.noOfPanels < this.panelsArray[1].count) {
                    primarySidePanels = this.props.noOfPanels
                }
            }
        }

        breakpoint = true;
        yearlySavingsdata = [];
        let capacity = this.props.capacity || parseInt(sessionStorage.getItem('pannel_capacity'));
        installedPowerOnPrimarySide = primarySidePanels * capacity;
        installedPowerOnSecondarySide = secondarySidePanels * capacity;
        primarySideAnualOutput = installedPowerOnPrimarySide * primarySideRadiation * solarRadiation * powerLoss * reducedPower;
        secondarySideAnnualOutput = installedPowerOnSecondarySide * secondarySideRadiation * solarRadiation * powerLoss * reducedPower;
        annualOutput = (primarySideAnualOutput + secondarySideAnnualOutput) / 1000;
        var firstYrSaving = annualOutput * this.state.electricityPerkw;
        var totalsavings;
        this.setState({ firstYrSaving: firstYrSaving });
        yearlySavingsdata.push(firstYrSaving);
        for (var i = 2; i <= 30; i++) {
            var x = parseInt(this.state.electricityRateIncrease.slice(0, -1));
            var power = Math.pow((1 + (x / 100)), i);
            var yrSaving = firstYrSaving * (power);
            yearlySavingsdata.push(yrSaving);
            totalsavings = yearlySavingsdata.reduce((partial_sum, a) => partial_sum + a, 0);
            if (totalsavings >= this.props.estimatedAmount && breakpoint) {
                breakpoint = false;
                this.setState({ breakEvenYr: i });
            }
        }
        this.setState({
            lifeTimeSaving: totalsavings
        })
    }

    increment(type) {
        if (type == 'elprisökning') {
            let value = parseFloat(this.state.electricityRateIncrease.slice(0, -1)),
                increasedValue = value + 1;
            this.setState({
                electricityRateIncrease: increasedValue.toFixed(0) + '%'
            });
        } else if (type == 'elpris') {
            let value = parseFloat(this.state.electricityPerkw),
                increasedValue = value + 0.1;
            this.setState({
                electricityPerkw: increasedValue.toFixed(1)
            });
        }
        setTimeout(() => {
            this.initalSumUp();
        }, 100);
    }

    decrement(type) {
        if (type == 'elprisökning') {
            let value = parseFloat(this.state.electricityRateIncrease.slice(0, -1)),
                decreasedValue = value - 1;
            this.setState({
                electricityRateIncrease: decreasedValue.toFixed(0) + '%'
            });
        } else if (type == 'elpris') {
            let value = parseFloat(this.state.electricityPerkw),
                decreasedValue = value - 0.1;
            this.setState({
                electricityPerkw: decreasedValue.toFixed(1)
            });
        }
        setTimeout(() => {
            this.initalSumUp();
        }, 100);
    }

    elprisChange(e) {
        this.setState({ electricityPerkw: e.target.value });
        setTimeout(() => {
            this.initalSumUp();
        }, 100);
    }

    elprisökningChange(e) {
        this.setState({ electricityRateIncrease: e.target.value + '%' });
        setTimeout(() => {
            this.initalSumUp();
        }, 100);
    }

    render() {
        return (
            <div className="row text-blue esaving-background padding20">
                <div className="col-md-1"></div>
                <div className="col-sm-10">
                    <div className="row slots-centering">
                        <div className="col-md-7 col-sm-12">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 section-name">Om vi räknar med</div>
                                <div className="col-md-6 col-sm-6 elpris panding_no">
                                    <div className="elpris-name col-sm-4">el pris :</div>
                                    <div className=" col-md-8 col-sm-6 panding_no">
                                        <ul className="main-list">
                                            <li className="mini-list">
                                                <input value={this.state.electricityPerkw} onChange={this.elprisChange} />
                                            </li>
                                            <li className="">
                                                <ul className="increment-icon">
                                                    <li className="increment-list" onClick={this.increment.bind(this, 'elpris')}>
                                                        <img src="./img/caret-symbol.png" alt="image" />
                                                    </li>
                                                    <li className="decrement-list" onClick={this.decrement.bind(this, 'elpris')}>
                                                        <img src="./img/down-arrow.png" alt="image" />
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-12 note-align">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 panding_no">
                                    <div className="och-style col-md-6 col-sm-6">elprisökning per år :</div>
                                    <div className=" col-md-6 col-sm-6">
                                        <ul className="main-list note-align">
                                            <li className="mini-list">
                                                <div className="elpris-value">
                                                    <input value={this.state.electricityRateIncrease} onChange={this.elprisökningChange} />
                                                </div>
                                            </li>
                                            <li className="">
                                                <ul className="increment-icon">
                                                    <li className="increment-list" onClick={this.increment.bind(this, 'elprisökning')}>
                                                        <img src="./img/caret-symbol.png" alt="image" />
                                                    </li>
                                                    <li className="decrement-list" onClick={this.decrement.bind(this, 'elprisökning')}>
                                                        <img src="./img/down-arrow.png" alt="image" />
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-12 col-sm-12">
                    <div className="col-md-4 col-sm-4  align-text-center border-right">
                        <div className="annual-savings">
                            <CountUp className="count-up" start={0} end={parseInt(this.state.firstYrSaving)} />
                            <span className="f21">SEK</span></div>
                        <div>
                            <p className="saving-name">ÅRLIG ELPRISÖKNING</p>
                        </div>
                        <div>
                            <p className="pricing-note">första året</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4  align-text-center border-right">
                        <div className="annual-savings">
                            <CountUp className="count-up" start={0} end={parseInt(this.state.breakEvenYr)} />
                            <span className="f21">ÅR</span></div>
                        <div>
                            <p className="saving-name">BREAKEVEN</p>
                        </div>
                        <div>
                            <p className="pricing-note">beräknad återbetalningstid</p>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4  align-text-center">
                        <div className="annual-savings">
                            <CountUp className="count-up" start={0} end={parseInt(this.state.lifeTimeSaving)} />
                            <span className="f21">SEK</span>
                        </div>
                        <div>
                            <p className="saving-name">TOTAL BESPARING</p>
                        </div>
                        <div>
                            <p className="pricing-note">under 30 år</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default ESaving