import React, { Component } from 'react';
import Modal from 'react-modal';
var CurrencyFormat = require('react-currency-format');
//var BarChartComponent = require('./components/BarChart');
var ESaving = require('./components/ESaving');
var PanelTypes = require('./components/PanelBatteryTypes');
var TimeBooking = require('./components/DatePicker');
const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        border: '2px solid #8ee2ae',
        transform: 'translate(-50%, -50%)',
        padding: '10px 15px 23px',
        fontSize: '16px',
        borderRadius: '20px',
        background: 'rgb(255, 255, 255)',
        overflow: 'auto',
        minHeight: '400px',
        width: '40%'
    }
}

const matstyle = {
    padding: 10,
    margin: 5,
    border: "1px solid #ccc",
    textAlign: "center",
    formmargin: { margin: 10, color: "#fff" },
    signup: {
        color: "#5bc0de",
        cursor: "pointer"
    },
    h2: {
        cursor: "pointer"
    }
}

let Roofprice = 0, costoflabour = 0;
let data = [
    { letter: 'Jan', productivity: 100 },
    { letter: 'Feb', productivity: 200 },
    { letter: 'Mar', productivity: 1000 },
    { letter: 'Apr', productivity: 1500 },
    { letter: 'May', productivity: 1800 },
    { letter: 'Jun', productivity: 2000 },
    { letter: 'Jul', productivity: 2300 },
    { letter: 'Aug', productivity: 2094 },
    { letter: 'Sep', productivity: 2966 },
    { letter: 'Oct', productivity: 2153 },
    { letter: 'Nov', productivity: 2772 },
    { letter: 'Dec', productivity: 2025 }]
var TaxOnInstallation,
    soalrIncentives,
    batteryCost,
    taxOnBattery,
    BatteryCostAfterTax,
    batteryIncentives,
    comissionOnBatteryIncentives,
    digisolarComission,
    finalCost,
    capacity, panelPrice, solarPanelsCount, CostOfSolarPanel,
    costPerOptimizer = 408, costOfInverterPrice, totalInstalledPowerInkw,
    CostOfOptimizer, skylift, CostOfKit = 800, CostOfMountingSystem,
    CostOfCable = 540, transportCost,
    laborCost, electricianCost = 5000, digisolarComission = 10000, superVisorCommission = 15000,
    installationBeforeTaxNoComm, installationBeforeTax, installationAfterIncentives, displayPrice, batteryAfterIncentive,Display_cost_of_solar_roof_installation,Battery_cost_after_tax,
    Solar_incentives,Cost_of_battery_after_incentives,Final_cost;
class Areaestimate extends Component {
    constructor(props) {
        super(props);
        window.scrollTo(0, 0);
        this.state = {
            stepIndex: 1,
            finished: false,
            clear: {},
            previous: {},
            next: {},
            haveaccount: false,
            email: '',
            password: '',
            name: '',
            phone: '',
            emailValid: false,
            passwordValid: false,
            formErrors: { email: '', password: '', name: '', phone: '' },
            phonevalid: false,
            namevalid: false,
            loginValid: false,
            signupValid: false,
            rooferrormessage: "",
            responceerror: "",
            responceerrorlogin: "",
            responceerrorsignup: "",
            date: new Date(),
            loaded: false,
            text: 'Estimerar pris...',
            color: 'rgb(46, 109, 164)',
            emailtext: 'Offert per mail',
            popup: false,
            panelpopup: false,
            modalIsOpen: false,
            PanelModalIsOpen: false,
            closeUpdatePanelmodal: false,
            datepicker: true,
            calenderIndex: 1,
            panelsCount: parseInt(this.props.panelsCount) || parseInt(sessionStorage.getItem('panelsCount')),
            battery: this.props.battery,
            panel: this.props.panel,
            e_consumption: this.props.e_consumption || (parseInt(sessionStorage.getItem('e_consumption').split('kwh')[0]).trim()),
            packetName: this.props.packetName,
            elpris: 0.9,
            elprisökning: 2,
            updation: false,
            annualProduction: this.props.annualoutput,
            availableslots: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '17:00'],
            pannel_capacity:this.props.pannel_capacity || parseInt(sessionStorage.getItem('pannel_capacity')),
            battery1:this.props.battery1,
            solarIncentives:this.props.solarIncentives,
            batteryIncentvies:this.props.batteryIncentvies,
            finalCost:this.props.finalCost,
            display_cost_of_solar_roof_installation:''
        }
        if (this.props.logedin) {
            setTimeout(() => {
                this.setState({
                    text: 'Letar leverantörer i ditt område'
                })
            }, 2000);
            setTimeout(() => {
                this.setState({
                    loaded: true
                })
            }, 5000);
        }
        this.modalpopup = this.modalpopup.bind(this)
        Modal.setAppElement('body');
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previous = this.previous.bind(this);
        this.modalPanelpopup = this.modalPanelpopup.bind(this);
        this.openPanelModal = this.openPanelModal.bind(this);
        this.afterOpenPanelModal = this.afterOpenPanelModal.bind(this);
        this.closePanelModal = this.closeModal.bind(this);
        this.initialValues = this.initialValues.bind(this);
        if (this.props.logedin === true) {
            if (this.props.area === "" || this.props.material === "") {
                alert("Something Went wrong please try again");
            } else {
                this.initialValues(this.state.panel, this.state.battery, this.state.panelsCount);
            }
        }
    }
initialValues(p, bat, count) {
    var Total_roof_area= sessionStorage.getItem('roofarea');
    var solar_roof_area = JSON.parse(sessionStorage.getItem('roofAreaPkt')).normalRoofArea;
    var normal_roof_area=Total_roof_area- solar_roof_area;
    var cost_of_solar_roof_tiles = solar_roof_area * parseInt(sessionStorage.getItem('panel_cost'));
    var cost_of_normal_roof_tiles = normal_roof_area*parseInt(sessionStorage.getItem('panel_cost'));
    var Cost_of_material = cost_of_solar_roof_tiles + cost_of_normal_roof_tiles;
    var labor_cost = Total_roof_area * 250 ;
    var floorPlan = ((this.props.floors).split("plan")[0]).trim();
    var floor = parseInt(floorPlan);
    var skylift=0;
    if(floor <=2) {
        skylift=0;
    }
    else if(floor >= 3){
        skylift = 5200;
    }
    var Cost_of_electrician = 6000;
    var Cost_of_cable = 540;
    var Cost_of_transport = 10000;
    var Cost_of_container = 10000;
    var capcity_price = 0
    var cost_of_invertor =0;
    if( this.props.pannel_name === 'Midsommar soltak') {
        
     cost_of_invertor = Total_roof_area * this.props.pannel_capacity;
    }
    else if(this.props.pannel_name == 'Bendars sunwave palema') {
        cost_of_invertor = Total_roof_area * this.props.pannel_capacity;
    }
        if(cost_of_invertor < 4000 ) {
            capcity_price = 9560
        }
     if(cost_of_invertor>4001 && cost_of_invertor<5000){
            capcity_price = 9660
        }
        if(cost_of_invertor>5001 && cost_of_invertor<7000) {
            capcity_price = 11500
        }
        if(cost_of_invertor>7001 && cost_of_invertor<8000) {
            capcity_price = 11830
        }
        if(cost_of_invertor>8001 && cost_of_invertor<10000) {
            capcity_price = 12760
        }
        if(cost_of_invertor>10001 && cost_of_invertor<15000) {
            capcity_price = 11350
        }
        if(cost_of_invertor>15001 && cost_of_invertor<17000) {
            capcity_price = 11620
        } 
        if(cost_of_invertor>17001 && cost_of_invertor<25000) {
            capcity_price = 16100
        }
        if(cost_of_invertor>25001 && cost_of_invertor<27600) {
            capcity_price = 16100
        }
        if(cost_of_invertor>27600) {
            capcity_price = 20000
        }
    
    
    var Cost_of_solar_roof_installation_before_tax = Cost_of_material + cost_of_invertor + Cost_of_cable + Cost_of_container + Cost_of_transport + Cost_of_electrician + skylift;
    var Digisolar_commission = (Cost_of_solar_roof_installation_before_tax * 15) / 100;
    if(Digisolar_commission > 15000) {
        Digisolar_commission = 15000;
    }
    var Cost_of_solar_roof_installatio_with_commission = Cost_of_solar_roof_installation_before_tax + Digisolar_commission;
    var Tax_on_solar_roof_installation = (Cost_of_solar_roof_installatio_with_commission * 25) / 100;
    var Cost_of_solar_roof_installation_after_tax = Cost_of_solar_roof_installatio_with_commission + Tax_on_solar_roof_installation;
     Display_cost_of_solar_roof_installation = (Cost_of_solar_roof_installation_after_tax * 93) / 100;
     Solar_incentives = (Display_cost_of_solar_roof_installation * 20) / 100;
    var Battery_cost = 84485;

    var Tax_on_battery = (84485 * 25) / 100
    
     Battery_cost_after_tax = Battery_cost + Tax_on_battery;
    sessionStorage.setItem('battery',Battery_cost_after_tax)
    var Battery_incentives = 50000;
    var Cost_of_solar_roof_installation_after_incentives =Display_cost_of_solar_roof_installation - Solar_incentives;
    sessionStorage.setItem('solarIncentives',Cost_of_solar_roof_installation_after_incentives)
     Cost_of_battery_after_incentives = Battery_cost_after_tax - Battery_incentives;
    sessionStorage.setItem('batteryIncentives',Cost_of_battery_after_incentives)
    Final_cost = Cost_of_solar_roof_installation_after_incentives + Cost_of_battery_after_incentives;
    sessionStorage.setItem('final_cost',Final_cost)
        let _self = this;
        if (p === 'Standard' || _self.state.panel === 'Standard') {
            capacity = 270;
            panelPrice = 1180;
        } else if (p === 'Premium' || _self.state.panel === 'Premium') {
            capacity = 320;
            panelPrice = 1400;
        }
        capacity = capacity ? capacity : sessionStorage.getItem('pannel_capacity')
        if (count) {
            solarPanelsCount = parseInt(count);
        } else if (_self.state.panelsCount) {
            solarPanelsCount = parseInt(_self.state.panelsCount);
        } else {
            solarPanelsCount = (parseInt(_self.state.e_consumption)).replace(' kWh', '') / capacity;
        }
        CostOfSolarPanel = solarPanelsCount * panelPrice;
        costOfInverterPrice = inverterPrice();
        totalInstalledPowerInkw = (solarPanelsCount * capacity) / 1000;
        function inverterPrice() {
            var costOfInverter = solarPanelsCount * capacity;
            if (costOfInverter <= 4000) {
                return 9560;
            } else if (costOfInverter >= 4001 && costOfInverter <= 5000) {
                return 9660;
            } else if (costOfInverter >= 5001 && costOfInverter <= 7000) {
                return 11500;
            } else if (costOfInverter >= 7001 && costOfInverter <= 8000) {
                return 11830;
            } else if (costOfInverter >= 8001 && costOfInverter <= 10000) {
                return 12760;
            } else if (costOfInverter >= 10001 && costOfInverter <= 15000) {
                return 11350;
            } else if (costOfInverter >= 15001 && costOfInverter <= 17000) {
                return 11620;
            } else if (costOfInverter >= 17001 && costOfInverter <= 25000) {
                return 16100;
            } else if (costOfInverter >= 25001 && costOfInverter <= 27600) {
                return 16400;
            } else {
                return 20000;
            }
        }

        CostOfOptimizer = solarPanelsCount * costPerOptimizer;
        CostOfMountingSystem = solarPanelsCount * mounting();
        function mounting() {
            switch (_self.props.material) {
                case 'Lertegeltak':
                    return 260;
                case 'Plåt':
                    return 200;
                case 'Betongtegeltak':
                    return 260;
                case 'Falsad plåt / Bandad Plåt':
                    return 200;
                case 'Papptak':
                    return 300;
            }
        }

        function transportingCost() {
            switch (true) {
                case (10 <= solarPanelsCount && solarPanelsCount <= 24):
                    return 3000;
                case (25 <= solarPanelsCount && solarPanelsCount <= 44):
                    return 3700;
                case (45 <= solarPanelsCount && solarPanelsCount <= 64):
                    return 4500;
                case (65 <= solarPanelsCount && solarPanelsCount <= 84):
                    return 5700;
                case (85 <= solarPanelsCount && solarPanelsCount <= 104):
                    return 7000;
                case (105 <= solarPanelsCount && solarPanelsCount <= 124):
                    return 8000;
                case (125 <= solarPanelsCount && solarPanelsCount <= 144):
                    return 9700;
                case (145 <= solarPanelsCount && solarPanelsCount <= 164):
                    return 11000;
                case (165 <= solarPanelsCount && solarPanelsCount <= 184):
                    return 11000;
                case (185 <= solarPanelsCount && solarPanelsCount <= 204):
                    return 12000;
                case (185 < solarPanelsCount):
                    let calculatedPrice = 25 * (solarPanelsCount - 205);
                    return 12000 + calculatedPrice;
            }
        }

        function labourCost() {
            switch (true) {
                case (solarPanelsCount <= 12):
                    return 12000;
                case (13 <= solarPanelsCount && solarPanelsCount <= 20):
                    return 13000;
                case (21 <= solarPanelsCount && solarPanelsCount <= 24):
                    return 14000;
                case (25 <= solarPanelsCount && solarPanelsCount <= 28):
                    return 1500;
                case (29 <= solarPanelsCount && solarPanelsCount <= 32):
                    return 16000;
                case (33 <= solarPanelsCount && solarPanelsCount <= 36):
                    return 17000;
                case (37 <= solarPanelsCount && solarPanelsCount <= 40):
                    return 18000;
                case (41 <= solarPanelsCount && solarPanelsCount <= 48):
                    return 19000;
                case (49 <= solarPanelsCount && solarPanelsCount <= 60):
                    return 20000;
                case (61 <= solarPanelsCount && solarPanelsCount <= 72):
                    return 22000;
                case (73 <= solarPanelsCount && solarPanelsCount <= 84):
                    return 24000;
                case (84 < solarPanelsCount):
                    let calculatedPrice = 270 * (solarPanelsCount - 84);
                    return 24000 + calculatedPrice;
            }
        }
        if (this.props.floors === '2 plan' || this.props.floors === '1 plan') {
            skylift = 0;
        } else {
            skylift = 5200;
        }
        transportCost = transportingCost();
        laborCost = labourCost();
        installationBeforeTaxNoComm = CostOfSolarPanel + CostOfOptimizer + costOfInverterPrice + CostOfMountingSystem +
            CostOfKit + CostOfCable + transportCost + laborCost + skylift + electricianCost;
        superVisorCommission = installationBeforeTaxNoComm * 11 / 100
        digisolarComission = installationBeforeTaxNoComm * 11 / 100;
        if (superVisorCommission > 12500) {
            superVisorCommission = 12500
        }
        if (digisolarComission > 12500) {
            digisolarComission = 12500
        }
        installationBeforeTax = installationBeforeTaxNoComm + superVisorCommission + digisolarComission;
        TaxOnInstallation = (installationBeforeTax * 25) / 100;
        Roofprice = installationBeforeTax + TaxOnInstallation;
        displayPrice = Roofprice * 93 / 100;
        soalrIncentives = displayPrice * 0.2;
        if (bat === 'Premium') {
            batteryCost = 84485;
            batteryIncentives = 50000;
        } else if (bat === 'Inga') {
            batteryCost = 0;
            batteryIncentives = 0;
        }
        taxOnBattery = (batteryCost * 25) / 100;
        BatteryCostAfterTax = batteryCost + taxOnBattery;
        comissionOnBatteryIncentives = 15000;
        installationAfterIncentives = displayPrice - soalrIncentives;
        batteryAfterIncentive = BatteryCostAfterTax - batteryIncentives;
        finalCost = installationAfterIncentives + batteryAfterIncentive
        this.SendEstimation(this);
    }

    closePanelModal() {
        this.setState({ PanelModalIsOpen: false, panelpopup: false, closeUpdatePanelmodal: false });
    }

    modalPanelpopup() {
        this.setState({ panelpopup: true, PanelModalIsOpen: true })
    }

    openPanelModal() {
    }

    afterOpenPanelModal() {
    }

    openModal() {
    }

    update(panel, battery, Count, packetName, annualOpt) {
        this.setState({
            closeUpdatePanelmodal: true,
            packetName: packetName,
            battery: battery,
            panel: panel,
            panelsCount: parseInt(Count),
            annualProduction: parseInt(annualOpt).toFixed(0)
        });
        sessionStorage.setItem('battery', battery);
        sessionStorage.setItem('panel', panel);
        sessionStorage.setItem('panelsCount', Count);
        sessionStorage.setItem('packetName', packetName);
        if (panel.length && battery.length) {
            var token = localStorage.getItem("token");
            var email = JSON.parse(localStorage.getItem("userdata")).email;
            var payload = {
                area: this.props.area,
                coordinates: JSON.stringify(this.props.coordinates),
                slope: this.props.style,
                estimatedamount: Roofprice,
                material: this.props.material,
                slopecost: this.props.roofstylecost,
                materialcost: this.props.materialcost,
                labour: costoflabour,
                address: this.props.address,
                email: email,
                power: this.props.power,
                e_consumption: this.state.e_consumption,
                floors: this.props.floors,
                roof_pitch: this.props.roof_pitch,
                property_type: this.props.property_type,
                battery: battery,
                panel: panel,
                panelsCount: Count,
                solar_installation_cost: installationBeforeTaxNoComm,
                supervisor_commission: superVisorCommission,
                digisolar_commission: digisolarComission,
                solar_installation_With_commission: installationBeforeTax,
                solar_installation_after_tax: Roofprice,
                display_cost: displayPrice,
                solar_incentives: soalrIncentives,
                battery_cost: batteryCost,
                battery_cost_after_tax: BatteryCostAfterTax,
                battery_incentives: comissionOnBatteryIncentives,
                solar_intallation_after_commission: installationAfterIncentives,
                battery_after_incentives: batteryAfterIncentive,
                final_cost: finalCost
            }

            fetch('users/estimation', {
                method: "post",
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*",
                }, body: 'json=' + JSON.stringify(payload) + '&token=' + token
            }).then(function (response) {
                return response;
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                localStorage.setItem('userdata', JSON.stringify(data));
            })
        }
        this.initialValues(panel, battery, Count);
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({ modalIsOpen: false, PanelModalIsOpen: false, closeUpdatePanelmodal: false });
    }

    modalpopup() {
        this.setState({ popup: true, modalIsOpen: true, calenderIndex: 1 })
    }

    nextPage(date, time) {
        if (this.state.calenderIndex > 3) {
            this.closeModal.bind(this);
        }
        else if (this.state.calenderIndex === 2) {
            let _self = this,
                userdata = JSON.parse(localStorage.getItem('userdata'));
            if (userdata && userdata._id) {
                var bookPayload = {
                    "contractor_id": "5d1350199880ff94115dedde",
                    "user_id": userdata._id,
                    "booking_slot_date": date,
                    "booking_slot_time": time
                }
                fetch('/contractor/book-appointment', {
                    method: "post",
                    crossDomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Request-Headers": "*",
                        "Access-Control-Request-Method": "*",

                    },
                    body: JSON.stringify(bookPayload)
                }).then(function (res) {
                    return res.json();
                }).then(function (result) {
                    _self.setState({
                        availableslots: data,
                        datepicker: false, calenderIndex: parseInt(_self.state.calenderIndex) + 1
                    })
                })
            }
        }
        else {
            this.setState({ datepicker: false, calenderIndex: parseInt(this.state.calenderIndex) + 1 })
        }
    }

    previous() {
        this.setState({ calenderIndex: this.state.calenderIndex - 1 })
    }

    colorChange(id) {
        if (id === 'offert' || id === 'telefon') {
            var btn = document.getElementById(id);
            btn.setAttribute("disabled", "disabled");
            btn.setAttribute("style", "background-color: #0FAF32");
            btn.innerHTML = "Inväntar offert...";
        }
    }

    signupsubmit(event) {
        event.preventDefault();
        if (this.state.formErrors.email === "" && this.state.formErrors.name === "" && this.state.formErrors.phone === "" && this.state.formErrors.password === "") {
            const main = this;
            var est = {
                area: this.props.area,
                coordinates: this.props.coordinates,
                slope: this.props.style,
                estimatedamount: Roofprice,
                material: this.props.material,
                slopecost: this.props.roofstylecost,
                materialcost: this.props.materialcost,
                labour: costoflabour,
                address: this.props.address,
                power: this.props.power,
                e_consumption: this.state.e_consumption,
                battery: this.state.battery,
                panel: this.state.panel,
                panelsCount: this.state.panelsCount,
                solar_installation_cost: installationBeforeTaxNoComm,
                supervisor_commission: superVisorCommission,
                digisolar_commission: digisolarComission,
                solar_installation_With_commission: installationBeforeTax,
                solar_installation_after_tax: Roofprice,
                display_cost: displayPrice,
                solar_incentives: soalrIncentives,
                battery_cost: batteryCost,
                battery_cost_after_tax: BatteryCostAfterTax,
                battery_incentives: comissionOnBatteryIncentives,
                solar_intallation_after_commission: installationAfterIncentives,
                battery_after_incentives: batteryAfterIncentive,
                final_cost: finalCost
            }

            var payload = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                type: 'USER',
                estdet: est
            }

            fetch(`users/registeruser`, {
                method: "post", headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                }, body: 'json=' + JSON.stringify(payload)
            }).then(function (response) {
                return response;
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.status === 400) {
                    main.setState({
                        responceerrorsignup: data.message
                    })
                } else if (data.status === 200) {
                    localStorage.setItem('userdata', JSON.stringify(data.data));
                    localStorage.setItem('token', data.token);
                    main.setState({
                        userdata: data.data,
                        responceerrorsignup: ""
                    })
                    main.props.loginmodefun(true);
                }
            })
        } else {
            alert("Please Fill All Mandatory Fields ");
        }
    }

    loginsubmit(event) {
        debugger;
        event.preventDefault();
        const main = this;
        var payload = {
            email: this.state.email,
            phone: this.state.phone,
            password: '123456',
            type: 'USER'
        }

        fetch('users/userLogin', {
            method: "post", headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*"
            }, body: 'json=' + JSON.stringify(payload)
        }).then(function (response) {
            return response;
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.status === 400) {
                main.setState({
                    responceerrorlogin: data.message
                })
            } else if (data.status === 200) {
                var userdata;
                main.setState({
                    responceerrorlogin: ""
                })
                if (data.data.type === "USER") {
                    userdata =
                        {
                            "type": data.data.type,
                            "estdet": data.data.estdet,
                            "updateon": data.data.updateon,
                            "cratedon": data.data.cratedon,
                            "email": data.data.email, "phone": data.data.phone, "name": data.data.name, "token": data.token
                        }
                    var payload = {
                        area: main.props.area,
                        coordinates: main.props.coordinates,
                        slope: main.props.style,
                        estimatedamount: Roofprice,
                        material: main.props.material,
                        slopecost: main.props.roofstylecost,
                        materialcost: main.props.materialcost,
                        labour: costoflabour,
                        address: main.props.address,
                        email: data.data.email,
                        property_type: main.props.property_type,
                        floors: main.props.floors,
                        roof_pitch: main.props.roof_pitch,
                        power: main.props.power,
                        e_consumption: main.state.e_consumption,
                        battery: main.props.battery,
                        panel: main.props.panel,
                        panelsCount: main.props.panelsCount,
                        solar_installation_cost: installationBeforeTaxNoComm,
                        supervisor_commission: superVisorCommission,
                        digisolar_commission: digisolarComission,
                        solar_installation_With_commission: installationBeforeTax,
                        solar_installation_after_tax: Roofprice,
                        display_cost: displayPrice,
                        solar_incentives: soalrIncentives,
                        battery_cost: batteryCost,
                        battery_cost_after_tax: BatteryCostAfterTax,
                        battery_incentives: comissionOnBatteryIncentives,
                        solar_intallation_after_commission: installationAfterIncentives,
                        battery_after_incentives: batteryAfterIncentive,
                        final_cost: finalCost
                    }
                    fetch('users/estimation', {
                        method: "post",
                        crossDomain: true,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            "Access-Control-Request-Headers": "*",
                            "Access-Control-Request-Method": "*",

                        }, body: 'json=' + JSON.stringify(payload) + '&token=' + data.token
                    })
                        .then(function (response) {
                            return response;
                        })
                        .then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            if (data.status === 400) {
                                main.setState({
                                    responceerror: data.message
                                })
                            } else if (data.status === 200) {
                                main.setState({
                                    responceerror: ""
                                })
                            }
                        })
                } else if (data.data.type === "CONTRACTOR") {
                    userdata = {
                        "type": data.data.type,
                        "organization_number": data.data, organization_number,
                        "address": data.data.address,
                        "website": data.data.website,
                        "businessname": data.data.businessname,
                        "updateon": data.data.updateon,
                        "cratedon": data.data.cratedon,
                        "email": data.data.email, "phone": data.data.phone, "name": data.data.name, "token": data.toke
                    }
                }
                localStorage.setItem('userdata', JSON.stringify(userdata));
                localStorage.setItem('token', data.toke);
                main.setState({
                    userdata: data.data
                })
                main.props.loginmodefun(true);
            }
        })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let phonevalid = this.state.phonevalid;
        let namevalid = this.state.namevalid;
        let emailValid = this.state.emailValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.length >= 6;
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                this.setState({ formErrors: fieldValidationErrors, emailValid: emailValid, email: value });
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                this.setState({ formErrors: fieldValidationErrors, passwordValid: passwordValid, password: value });
                break;
            case 'phone':
                phonevalid = value.length === 10;
                fieldValidationErrors.phone = phonevalid ? '' : 'phone number  is too short';
                this.setState({ formErrors: fieldValidationErrors, phonevalid: phonevalid, phone: value });
                break;
            case 'name':
                namevalid = value.length >= 6;
                fieldValidationErrors.name = namevalid ? '' : ' is too short';
                this.setState({ formErrors: fieldValidationErrors, namevalid: namevalid, name: value });
                break;
            default:
                break;
        }
    }

    haveaccountfunction() {
        this.setState({
            haveaccount: !this.state.haveaccount
        })
    }

    SendEstimation() {
        var token = localStorage.getItem("token");

        var userdata = JSON.parse(localStorage.getItem("userdata"))
        if(userdata){
         var email = userdata.email
        };
        var payload = {
            area: this.props.area,
            coordinates: JSON.stringify(this.props.coordinates),
            slope: this.props.style,
            estimatedamount: Roofprice,
            material: this.props.material,
            slopecost: this.props.roofstylecost,
            materialcost: this.props.materialcost,
            labour: costoflabour,
            address: this.props.address,
            email: email,
            power: this.props.power,
            e_consumption: this.state.e_consumption,
            floors: this.props.floors,
            roof_pitch: this.props.roof_pitch,
            property_type: this.props.property_type,
            battery: this.state.battery,
            panel: this.state.panel,
            panelsCount: this.state.panelsCount,
            solar_installation_cost: installationBeforeTaxNoComm,
            supervisor_commission: superVisorCommission,
            digisolar_commission: digisolarComission,
            solar_installation_With_commission: installationBeforeTax,
            solar_installation_after_tax: Roofprice,
            display_cost: displayPrice,
            solar_incentives: soalrIncentives,
            battery_cost: batteryCost,
            battery_cost_after_tax: BatteryCostAfterTax,
            battery_incentives: comissionOnBatteryIncentives,
            solar_intallation_after_commission: installationAfterIncentives,
            battery_after_incentives: batteryAfterIncentive,
            final_cost: finalCost
        }

        fetch('users/estimation', {
            method: "post",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",

            }, body: 'json=' + JSON.stringify(payload) + '&token=' + token
        }).then(function (response) {
            return response;
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            localStorage.setItem('userdata', JSON.stringify(data));
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.closeUpdatePanelmodal && !nextState.modalIsOpen) {
            setTimeout(this.initialValues(nextState.panel, nextState.battery, nextState.panelsCount), 2000);
            this.closeModal();
        }
    }

    render() {
        if (this.props.logedin === true && this.props.componentindex === "7") {
            return (
                <div className="container">
                    {!this.state.loaded ? (
                        <div className="container-fluid p-b-5">
                            <video className="loader" id="background-video" loop autoPlay muted>
                                <source src="./img/animation2.mp4" type="video/mp4" />
                            </video>
                            <div className="loaderText"><p>{this.state.text}</p></div>
                        </div>
                    ) : this.state.PanelModalIsOpen ?
                            <PanelTypes battery={this.state.battery}
                                panel={this.state.panel}
                                packetsCount={this.state.panelsCount}
                                packetName={this.state.packetName}
                                update={this.update.bind(this)}
                                location={this.props.roofaddress}
                                e_consumption={this.state.e_consumption}
                                closeModal={this.closeModal.bind(this)}
                                closeUpdatePanelmodal={this.state.closeUpdatePanelmodal}
                                PanelModalIsOpen={this.state.PanelModalIsOpen}
                                roof_pitch={this.props.roof_pitch}
                                surfaceDirection={this.props.surfaceDirection}
                                annualProduction={this.state.annualProduction}
                                area={this.props.area} /> : (
                                <div>
                                    <div className="" id="estimateright" style={{ marginTop: 20 }} >
                                        <div className="col-sm-12 col-md-12 panding_no">
                                            <div className="col-sm-6 col-md-6">
                                                <div className="area-estimation-card-heading font-quicksand ">Ditt tak</div>
                                                <div className="col-md-12 col-sm-12 area-estimation-cards">
                                                    <h3 id="cap-address">{this.props.address}</h3>
                                                    <div className="col-sm-12 panding_no">
                                                        <div className="col-sm-12 col-md-6 panding_no">
                                                            <h3 id="eststep2"><strong className="uppercase f15">Fastighetstyp: </strong><br />
                                                                <b className="f15">{this.props.property_type}</b></h3>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 panding_no">
                                                            <h3 id="eststep2"><strong className="uppercase f15">Årlig elförbrukning : </strong><br />
                                                                <b className="f15">{this.state.e_consumption}</b></h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-12 panding_no">
                                                        <div className="col-sm-12 col-md-6  panding_no">
                                                            <h3 id="eststep2"><strong className="uppercase f15">Taklutning : </strong><br />
                                                                <b className="f15">{this.props.roof_pitch} ° </b></h3>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 panding_no">
                                                            <h3 id="eststep2"><strong className="uppercase f15">Huvudsäkring : </strong><br />
                                                                <b className="f15">{this.props.power}</b></h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12  col-md-12 panding_no">
                                                        <div className="col-sm-12 col-md-6 panding_no">
                                                            <h3 id="eststep2"><strong className="uppercase f15">Takmaterial : </strong><br />
                                                                <b className="f15">{this.props.material}</b></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                               
                                            <div className="col-sm-6 col-md-6">
                                                <div className="area-estimation-card-heading font-quicksand ">Din Produkt</div>
                                                <div className="col-md-12 col-sm-12 estimation-panel-card">
                                                    {(sessionStorage.getItem('selected_panel')=='solpanel' ) ?
                                                        <div className="col-sm-12 col-md-6 card-content-bottom">
                                                        <div className="col-sm-12">
                                                            <h3 id="eststep2"><strong className="uppercase f15">SOLPANEL: </strong><br />
                                                                <b className="f15">{this.state.panel}</b></h3>
                                                        </div>
                                                        <div className="col-sm-12 col-md-12">
                                                            <h3 id="eststep2"><strong className="uppercase f15">ANTal PANEL:</strong><br />
                                                                <b className="f15">{this.state.panelsCount}</b></h3>
                                                        </div>
                                                        <div className="col-sm-12  col-md-12 ">
                                                            <h3 id="eststep2"><strong className="uppercase f15">BATTERI </strong><br />
                                                                <b className="f15">{this.state.battery}</b></h3>
                                                        </div>
                                                    </div> :        <div className="col-sm-12 col-md-6 card-content-bottom">
                                                        <div className="col-sm-12">
                                                            <h3 id="eststep2"><strong className="uppercase f15">SOlTAK </strong><br />
                                                                <b className="f15">{sessionStorage.getItem('pannel_name')}</b></h3>
                                                        </div>
                                                        <div className="col-sm-12 col-md-12">
                                                            <h3 id="eststep2"><strong className="uppercase f15">SOlTAK  YTA</strong><br />
                                                                <b className="f15">{Math.floor(sessionStorage.getItem('smallRoofAreaValue'))}</b></h3>
                                                        </div>
                                                        <div className="col-sm-12  col-md-12 ">
                                                            <h3 id="eststep2"><strong className="uppercase f15">Batteri </strong><br />
                                                                <b className="f15">{this.state.battery}</b></h3>
                                                        </div>
                                                  
                                                    </div>
                                                }
                                                
                                                    <div className="col-md-6 col-sm-12 align-text-center">
                                                        <button className="panel-card-button" onClick={this.modalPanelpopup}>Byt Produkt</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 panding_no">
                                            <div className="col-sm-6 col-md-6">
                                                <div className="area-estimation-card-heading font-quicksand ">Elproduktion</div>
                                                <div className="col-md-12 col-sm-12 estimation-panel-card elproduction">
                                                    <div className="col-sm-12 panding_no ">
                                                        <div className="col-sm-12 col-md-6 panding_no">
                                                            <h3 id="eststep2" className="align-text-center">
                                                                <b className="f15">installerade effekt </b><br />
                                                                <div className="per-panel">{totalInstalledPowerInkw} kWh</div></h3>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 panding_no">
                                                            <h3 id="eststep2" className="align-text-center">
                                                                <b className="f15">Årsproduktion </b><br />
                                                                <div className="per-panel">{this.state.annualProduction} kWh</div></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="area-estimation-card-heading font-quicksand">Pris </div>
                                                <div className="col-md-12 panding_no">
                                                    <div className="table-bg  pris_height">
                                                        <table className="table amount-total">
                                                            <tbody>
                                                                <tr className="font-weignt-700">
                                                                    <td className="table-cat padding-left-none padding-right-none w48">
                                                                        Solpanelsanlägging  och installation
                                                                </td>
                                                                    <td className="table-price-width">
                                                                    {(sessionStorage.getItem('selected_panel')=='solpanel' ) ?
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={parseFloat(displayPrice.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                                                                        :
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={parseFloat(Display_cost_of_solar_roof_installation.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                                                                    }
                                                                        <span className="f21"> SEK</span>
                                                                    </td>
                                                                </tr>
                                                                <tr className="font-weignt-700">
                                                                    <td className="table-cat padding-left-none w48">Batteri</td>
                                                                    <td className="table-price-width">
                                                                    {(sessionStorage.getItem('selected_panel')=='solpanel' ) ?
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={parseFloat(BatteryCostAfterTax.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                                                                        :
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={parseFloat(Battery_cost_after_tax.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                                                                }
                                                                        <span className="f21"> SEK</span>
                                                                    </td>
                                                                </tr>
                                                                <tr className=" font-weignt-700">
                                                                    <td className="table-cat padding-left-none w48">Solcellsstöd</td>
                                                                    <td className="table-price-width">
                                                                    {(sessionStorage.getItem('selected_panel')=='solpanel' ) ?
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={-parseFloat(soalrIncentives.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                                                                        :
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={-parseFloat(Solar_incentives.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                                                            }
                                                                        <span className="f21"> SEK</span>
                                                                    </td>
                                                                </tr>
                                                                <tr className="total-border font-weignt-700">
                                                                    <td className="table-cat padding-left-none w48">Batteristöd</td>
                                                                    <td className="table-price-width">
                                                                    {(sessionStorage.getItem('selected_panel')=='solpanel' ) ?
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={batteryIncentives > 0 ? -parseFloat(batteryIncentives.toFixed(0)) : batteryIncentives} displayType={'text'} thousandSeparator={' '} />
                                                                        :
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={Cost_of_battery_after_incentives > 0 ? -parseFloat(Cost_of_battery_after_incentives.toFixed(0)) : Cost_of_battery_after_incentives} displayType={'text'} thousandSeparator={' '} />
                                                        }
                                                                        <span className="f21"> SEK</span>
                                                                    </td>
                                                                </tr>
                                                                <tr className="font-weignt-700">
                                                                    <td className="table-cat padding-left-none w48">Total(inkl moms)</td>
                                                                    <td className="table-price-width">
                                                                    {(sessionStorage.getItem('selected_panel')=='solpanel' ) ?
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={parseFloat(finalCost.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                                                                        :
                                                                        <CurrencyFormat style={{ fontSize: 25 }} value={parseFloat(Final_cost.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                                                    }
                                                                        <span className="f21"> SEK</span></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 align-text-center align-appointment">
                                            <button id="appointment-button" className="btn btn-info" onClick={this.modalpopup}>Boka Besiktning</button>
                                        </div>
                                        {this.state.popup ? (
                                            <div>
                                                <Modal
                                                    isOpen={this.state.modalIsOpen}
                                                    onAfterOpen={this.afterOpenModal}
                                                    onRequestClose={this.closeModal}
                                                    style={customStyles}
                                                    contentLabel="Example Modal">
                                                    <div className="col-md-12 panding_no">
                                                        <div className="boka-heading">Boka Besiktning</div>
                                                        <div className="f-right">
                                                            <button className="close-button " onClick={this.closeModal}>X</button>
                                                        </div>
                                                    </div>
                                                    <TimeBooking previous={this.previous.bind(this)}
                                                        closeModal={this.closeModal.bind(this)}
                                                        calenderIndex={this.state.calenderIndex}
                                                        nextPage={this.nextPage.bind(this)} />
                                                </Modal>
                                            </div>
                                        ) : (null)}
                                        <div className="col-sm-12 col-md-12 panding_no">
                                            <div className="area-estimation-card-heading font-quicksand">Solekonomi</div>
                                            <ESaving roof_pitch={this.props.roof_pitch} packetName={this.props.packetName} roofarea={this.props.area} location={this.props.roofaddress} direction={this.props.surfaceDirection} noOfPanels={this.state.panelsCount} capacity={capacity} estimatedAmount={displayPrice} />
                                        </div>
                                        <div className="col-sm-12 col-md-12 panding_no">
                                            <div className="col-sm-12 panding_no align-text-center  m-50">
                                                <h2 style={{ color: '#064f70', fontWeight: 'bold', fontFamily: 'quicksand' }}>Våra installationer innehåller alltid</h2>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className=" col-sm-6 separet_width">
                                                    <h4><img src="./img/Check-Mark-2.png" alt='Check-Mark-2' /><b>Allt material ink solpaneler </b> </h4>
                                                    <h4><img src="./img/Check-Mark-2.png" alt='Check-Mark' /><b>Komplett installation inkl elektriker</b></h4>
                                                    <h4><img src="./img/Check-Mark-2.png" alt='CheckMark' /><b>Transport till mottagaradress </b> </h4>
                                                    <h4><img src="./img/Check-Mark-2.png" alt='CheckedMark' /><b>Ställningsmontage &amp; taksäkerhet </b> </h4>
                                                    <h4><img src="./img/Check-Mark-2.png" alt='CheckerMark' /><b>Projektledning och dimensionering </b> </h4>
                                                    <h4><img src="./img/Check-Mark-2.png" alt='Check' /><b>För och färdiganmälan till nätägare </b> </h4>
                                                    <h4><img src="./img/Check-Mark-2.png" alt='CheckM' /><b>Uppkoppling av växelriktare för övervakning av produktion</b> </h4>
                                                </div>
                                                <div className="col-sm-6" style={{ textAlign: 'center', alignItems: 'center' }}>
                                                    <img className="img-responsive" alt='image' src="./img/solar_estimation.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                    }
                </div>
            )
        } else {
            return (
                <div> 
                    <div className="container-fluid bg-white">
                        <div className="shdow_wt">
                            <div className="row ">
                                <div className="col-sm-12 text-center login_txt">
                                    <img src="./img/disolar_logo_black.png" alt='disolar_logo_black' />
                                    <h3>Din prisuppskattning är färdig!</h3>
                                    <h4>Vi har nu genererat din prisuppskattning baserat på följande uppgifter:</h4>
                                </div>
                                <div className="col-sm-12 text-center registrn_add  login_txt">
                                    <p><span className="addres_txt">Adress :</span> {this.props.address}</p>
                                    <p><span className="addres_txt">Fastighetstyp :</span> {this.props.property_type}</p>
                                    <p><span className="addres_txt">Taklutning :</span> {this.props.roof_pitch} °</p>
                                    <p><span className="addres_txt">Takmaterial :</span>  {this.props.material}</p>
                                    <p><span className="addres_txt">Årlig elförbrukning :</span> {this.state.e_consumption}</p>
                                    <p><span className="addres_txt">Huvudsäkring :</span> {this.props.power}</p>
                                    <h4>Vänligen skriv in din e-postadress för att få tillgång till din prisuppskattning</h4>
                                </div>
                            </div>
                            <div className="row form_bottom1">
                                <div className="col-sm-12">
                                    <div className="form_top2"><div >
                                        <GetDetails haveaccountfunction={this.haveaccountfunction.bind(this)}
                                            haveaccount={this.state.haveaccount}
                                            loginsubmit={this.loginsubmit.bind(this)}
                                            signupnsubmit={this.signupsubmit.bind(this)}
                                            responceerror={this.state.responceerror}
                                            responceerrorlogin={this.state.responceerrorlogin}
                                            responceerrorsignup={this.state.responceerrorsignup}
                                            validateField={this.validateField.bind(this)}
                                        /></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="btmimg">
                                <img src="./img/bootm-im.jpg" className="img-responsive" alt='bootm-im.jpg' />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

class GetDetails extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        this.props.validateField(event.target.name, event.target.value)
    }

    render() {
        return (<form onSubmit={this.props.loginsubmit.bind(this)} id="login" style={matstyle.formmargin}>
            <div className="alert alert-danger" hidden={(this.props.responceerrorlogin === "")} >
                {this.props.responceerrorlogin}
            </div>
            <input type="email" name="email" placeholder="E-postadress*" className="form-control input-bg" onBlur={this.handleChange.bind(this)} required />
            <span id="error">{this.props.EmailErrors}
            </span>
            <input type="text" name="phone" className="form-control input-phonebg" placeholder="Telefonnummer*" onBlur={this.handleChange.bind(this)} required />
            <span id="error">{this.props.PhoneErrors}
            </span>
            <br />
            <div> <input type="submit" className='form-control btn-primary' value="Vidare" /></div>
        </form>)
    }
}

export default Areaestimate;