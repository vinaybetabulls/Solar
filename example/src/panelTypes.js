import React, { Component } from 'react';
import Modal from 'react-modal';
const matstyle = {
    padding: "20px",
    margin: "5px 5px 50px 5px",
    border: "4px solid #f9f9f9",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out",
    textTransform: "uppercase",
    color: '#064f70',
    fontSize: '16px',
    minHeight: '240px'
}

const selectedStyle = {
    padding: "20px",
    margin: "5px 5px 50px 5px",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out",
    border: "4px solid rgb(142, 226, 174)",
    textTransform: "uppercase",
    color: '#064f70',
    fontWeight: 'bold',
    fontSize: '16px',
    minHeight: '240px'
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        position: ' absolute',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px 15px 23px',
        fontSize: '16px',
        border: "4px solid rgb(142, 226, 174)",
        borderRadius: '20px',
        width: '50%',
        background: '#ffffff'
    }
};
let annualOutput, installedPower,
    solarRadiation = 0.9, powerLoss = 0.9,
    reducedPower = 0.9, Standardpacket, maxPacket, minPacket, capacity, totalInstalledPowerInkw;
class PanelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: '',
            validationOne: false,
            panel_cost: '',
            battery_cost: '',
            battery: '',
            value: 12,
            message: null,
            panelCount: [],
            packetName: '',
            packetsCount: 0,
            validationThree: false,
            popup: false,
            modalIsOpen: false,
            customPacket: "Ange antal paneler",
            selectedPacket: 'Custom paket',
            panelarrayUpdate: false,
            modalForPanelIsOpen: false,
            panelPopup: false,
            batteryPopup: false,
            annualOutput: 0,
            maximumPackets: 0,
            panelCountValidation: false,
            minimumPackets: 0,
            soltakPanels:[],
            soltakCustomPaket: 'Specify the area of soloar roof'
        }
        window.scrollTo(0, 0);
        this.modalpopup = this.modalpopup.bind(this)
        Modal.setAppElement('body');
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.validate = this.validate.bind(this);
        this.selectedCount = this.selectedCount.bind(this);
        this.panelTypesChange = this.panelTypesChange.bind(this);
        this.countOfpanels = this.countOfpanels.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.closePanelModal = this.closePanelModal.bind(this);
        this.openPanelPopup = this.openPanelPopup.bind(this);
        this.closeBatteryModal = this.closeBatteryModal.bind(this);
        this.openBatteryPopup = this.openBatteryPopup.bind(this);
        this.closePacketModal = this.closePacketModal.bind(this);
        this.openPacketPopup = this.openPacketPopup.bind(this);
        this.annualOutput = this.annualOutput.bind(this);
        this.calculateRoofArea = this.calculateRoofArea.bind(this)

        this.panels = [{
            image: "./img/premium_panel2.jpg",
            name: "Premium",
            cost: 1180
        },
        {
            image: "./img/Standard_Panel2.jpg",
            name: "Standard",
            cost: 1400
        }
    ];
    this.soltakPanels = [ {
        image: "./img/Standard_Panel2.jpg",
        name: "Midsommar soltak",
        cost: 1600
    },
    {
        image: "./img/Standard_Panel2.jpg",
        name: "Bendars sunwave palema",
        cost: 1800
    }]
        this.batteries = [
            {
                image: "./img/premium-battery.png",
                name: "Premium",
                cost: 300
            },
            {
                image: "./img/no_battery.png",
                name: "Inga",
                cost: 220
            }]
        function degrees_to_radians(degrees) {
            var pi = Math.PI;
            return degrees * (pi / 180);
        }
        var roofArea = parseInt(this.props.roofarea) / Math.cos(degrees_to_radians(parseInt(this.props.roof_pitch)));
        this.soltakPanelsArray = [
            {packet: 'Small paket', count: Math.floor(parseInt(this.calculateRoofArea('Small paket',roofArea)))},
            {packet: 'Standard paket', count: Math.floor(parseInt(this.calculateRoofArea('Standard paket',roofArea)))},
            {packet: 'Max paket', count: Math.floor(parseInt(this.calculateRoofArea('Max paket',roofArea)))},
            {packet:'Custom paket', count : 'Specify the area of solar roof'}
        ];
        console.log(this.soltakPanelsArray)
       
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
            normalRoofArea = roofArea ;
        }
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

    componentDidMount() {
    }

    annualOutput(watts, packet, countOfPanels) {
        var primarySideAnualOutput, secondarySideAnnualOutput, installedPowerOnPrimarySide, installedPowerOnSecondarySide,
            primarySideRadiation, secondarySideRadiation, primarySidePanels = 0, secondarySidePanels = 0;
        if (this.props.surfaceDirection == 'VÄST 1' || this.props.surfaceDirection == 'OST 2') {//west east
            primarySideRadiation = 0.84;
            secondarySideRadiation = 0.76;
        } else if (this.props.surfaceDirection == 'VÄST 2' || this.props.surfaceDirection == 'OST 1') {//west east
            primarySideRadiation = 0.88;
            secondarySideRadiation = 0.72;
        } else if (this.props.surfaceDirection == 'SYDVÄST 1') {//southwest
            primarySideRadiation = 0.92;
            secondarySideRadiation = 0.68;
        } else if (this.props.surfaceDirection == 'SYDVÄST') {//southwest
            primarySideRadiation = 0.96;
            secondarySideRadiation = 0.64;
        } else if (this.props.surfaceDirection == 'SYD 1' || this.props.surfaceDirection == 'SYD 2') {//south
            primarySideRadiation = 1;
            secondarySideRadiation = 0.60;
        } else if (this.props.surfaceDirection == 'SYDOST 1') {//southeast
            primarySideRadiation = 0.92;
            secondarySideRadiation = 0.64;
        } else if (this.props.surfaceDirection == 'SYDOST 2') {//southeast
            primarySideRadiation = 0.92;
            secondarySideRadiation = 0.68;
        } else if (this.props.surfaceDirection == 'OST 1') {//east
            primarySideRadiation = 0.84;
            secondarySideRadiation = 0.72;
        }
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
        if (packet) {
            if(this.state.panelName == 'soltak') {
                var packetValuesObject = this.soltakPanelsArray.filter(function (packetObj) {
                    return packetObj.packet === packet
                })
            }
            else if(this.state.panelName == 'solpanel') {
                var packetValuesObject = this.panelsArray.filter(function (packetObj) {
                    return packetObj.packet === packet
                })
            }
            sessionStorage.setItem('selected_panel',this.state.panelName)
            totalInstalledPowerInkw = (countOfPanels * watts) / 1000;
            if (packetValuesObject[0].packet == 'Small paket' || packetValuesObject[0].packet == 'Standard paket') {
                primarySidePanels = countOfPanels;
            } else if (packetValuesObject[0].packet == 'Max paket') {
                primarySidePanels = countOfPanels / 2;
                secondarySidePanels = countOfPanels / 2;
            } else if (packetValuesObject[0].packet == 'Custom paket') {
                if (countOfPanels > this.panelsArray[1].count) {
                    primarySidePanels = this.panelsArray[1].count;
                    secondarySidePanels = countOfPanels - this.panelsArray[1].count
                } else if (countOfPanels == this.panelsArray[1].count || countOfPanels < this.panelsArray[1].count) {
                    primarySidePanels = countOfPanels
                }
            }
            installedPowerOnPrimarySide = primarySidePanels * watts;
            installedPowerOnSecondarySide = secondarySidePanels * watts;
            primarySideAnualOutput = installedPowerOnPrimarySide * primarySideRadiation * solarRadiation * powerLoss * reducedPower;
            secondarySideAnnualOutput = installedPowerOnSecondarySide * secondarySideRadiation * solarRadiation * powerLoss * reducedPower;
            annualOutput = (primarySideAnualOutput + secondarySideAnnualOutput) / 1000;
            this.setState({
                annualOutput: annualOutput
            })
        } else {
            this.setState({
                annualOutput: 0
            })
        }
    }

    openModal() {
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    modalpopup() {
        this.setState({ popup: true, modalIsOpen: true })
    }

    selectedPanel(panel, cost, panelName) {
        
        if (panel === 'Standard') {
            capacity = 270;
        } else if (panel === 'Premium') {
            capacity = 320;
        }
        else if(panel === 'Midsommar soltak') {
            capacity = 110 ;
        }
        else if(panel === 'Bendars sunwave palema') {
            capacity = 105;
        }
        this.setState({
            panel: panel,
            panel_cost: cost,
            validationOne: false,
            panelName: panelName,
            //panelCount: panelsArray
        });
        sessionStorage.setItem('panel_cost',cost)
        sessionStorage.setItem('pannel_name',panel);
        sessionStorage.setItem('pannel_capacity',capacity);
        sessionStorage.setItem('pannelName',panelName);
        this.annualOutput(capacity, this.state.packetName, this.state.packetsCount)
    }

    selectedBattery(battery, cost) {
        this.setState({
            battery: battery,
            battery_cost: cost,
            validationTwo: false
        })
    }

    selectedCount(name, count) {
        if (name == 'Custom paket' || name == 'Selected Paket' ) {
            this.setState({ popup: true, modalIsOpen: true, packetName: name })
        }
        else if(name == 'Specify the area of solar roof') {
            this.setState({ popup: true, modalIsOpen: true, packetName: name })
        }
        else if (name === '') {
            this.setState({
                packetName: 'Custom paket',
                selectedPacket: 'Custom paket',
                packetsCount: count,
                validationThree: false,
                value: count,
                customPacket: parseInt(this.state.value),
                panelarrayUpdate: true,
                modalIsOpen: false,
                packetPopup: true,
                value: this.state.value,
            })
            this.annualOutput(capacity, 'Custom paket', count);
        } else {
            this.setState({
                packetName: name,
                packetsCount: count,
                validationThree: false,
                panelarrayUpdate: true,
                customPacket: "Ange antal paneler",
                packetPopup: true,
                soltakCustomPaket: 'Specify the area of solar roof'
            })
            this.annualOutput(capacity, name, count);
        }
        this.calculateRoofArea(name,this.roofArea)
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
            normalRoofArea = roofArea ;
        }
        sessionStorage.setItem('roofAreaPkt',JSON.stringify({
            smallRoofArea : smallRoofArea,
            normalRoofArea: normalRoofArea
        }))
        
       return normalRoofArea;
    }

    componentWillUpdate(state, prop) {
        let _self = this;
        setTimeout(changeUpdate(prop), 2000);
        function changeUpdate(props) {
            if (props.panelarrayUpdate) {
                _self.setState({ panelarrayUpdate: false });
                function degrees_to_radians(degrees) {
                    var pi = Math.PI;
                    return degrees * (pi / 180);
                }
                var roofArea = parseInt(_self.props.roofarea) / Math.cos(degrees_to_radians(parseInt(_self.props.roof_pitch)));
                if (roofArea > 400) {
                    _self.panelsArray = [];
                    Standardpacket = 100;
                    minPacket = 12;
                    _self.panelsArray = [
                        { packet: 'Small paket', count: parseInt(minPacket) },
                        { packet: 'Standard paket', count: parseInt(Standardpacket) },
                        { packet: props.selectedPacket, count: props.customPacket }
                    ]
                    _self.setState({ maximumPackets: Standardpacket, minimumPackets: minPacket });
                } else if (roofArea < 400 && roofArea > 200) {
                    _self.panelsArray = [];
                    Standardpacket = parseInt(roofArea / 4);
                    minPacket = 12;
                    maxPacket = 100;
                    _self.panelsArray = [
                        { packet: 'Small paket', count: parseInt(minPacket) },
                        { packet: 'Standard paket', count: parseInt(Standardpacket) },
                        { packet: 'Max paket', count: parseInt(maxPacket) },
                        { packet: props.selectedPacket, count: props.customPacket }
                    ]
                    _self.setState({ maximumPackets: maxPacket, minimumPackets: minPacket })
                } else if (roofArea < 200 && roofArea > 36) {
                    _self.panelsArray = [];
                    maxPacket = parseInt(roofArea / 2);
                    Standardpacket = (1 / 2) * maxPacket;
                    minPacket = 12;
                    _self.panelsArray = [
                        { packet: 'Small paket', count: parseInt(minPacket) },
                        { packet: 'Standard paket', count: parseInt(Standardpacket) },
                        { packet: 'Max paket', count: parseInt(maxPacket) },
                        { packet: props.selectedPacket, count: props.customPacket }
                    ]
                    _self.setState({ maximumPackets: maxPacket, minimumPackets: minPacket })
                } else if (roofArea < 36 && roofArea > 26) {
                    _self.panelsArray = [];
                    Standardpacket = parseInt(roofArea / 2);
                    minPacket = 12;
                    _self.panelsArray = [
                        { packet: 'Small paket', count: parseInt(minPacket) },
                        { packet: 'Standard paket', count: parseInt(Standardpacket) },
                        { packet: props.selectedPacket, count: props.customPacket }
                    ]
                    _self.setState({ maximumPackets: Standardpacket, minimumPackets: minPacket })
                } else if (roofArea < 26) {
                    _self.panelsArray = [];
                    Standardpacket = 12;
                    _self.panelsArray = [
                        { packet: 'Standard paket', count: parseInt(Standardpacket) },
                        { packet: props.selectedPacket, count: props.customPacket }
                    ]
                    _self.setState({ maximumPackets: Standardpacket, minimumPackets: 12 })
                }
            }
        }
    }

    validate() {
        if (this.state.panel === '') {
            this.setState({ validationOne: true });
        } else if (this.state.battery === '') {
            this.setState({ validationTwo: true });
        } else if (this.state.packetsCount === '') {
            this.setState({ validationThree: true });
        }
    }

    panelTypesChange(panel, battery, value) {
        sessionStorage.removeItem('panel');
        sessionStorage.removeItem('battery');
        sessionStorage.removeItem('panelsCount');
        sessionStorage.setItem('panel', panel);
        sessionStorage.setItem('battery', battery);
        sessionStorage.setItem('panelsCount', value);
    }

    countOfpanels(e) {
        if (this.state.minimumPackets <= e.target.value && e.target.value <= this.state.maximumPackets) {
            this.setState({
                value: e.target.value,
                selectedPacket: 'Custom paket',
                packetName: 'Custom paket',
                panelCountValidation: false
            });
        } else {
            this.setState({
                value: e.target.value,
                panelCountValidation: true
            })
        }
    }

    increment() {
        if (this.state.value <= this.state.maximumPackets - 1) {
            this.setState({
                value: parseInt(this.state.value) + 1,
                panelCountValidation: false
            });
        } else {
            this.setState({ panelCountValidation: true });
        }
    }

    decrement() {
        if (this.state.value >= this.state.minimumPackets + 1) {
            this.setState({
                value: parseInt(this.state.value) - 1,
                panelCountValidation: false
            });
        } else {
            this.setState({ panelCountValidation: true });
        }
    }

    openPanelPopup() {
        this.setState({ modalForPanelIsOpen: true, panelPopup: true })
    }

    closePanelModal() {
        this.setState({ modalForPanelIsOpen: false, panelPopup: false })
    }

    openBatteryPopup() {
        this.setState({ modalForBatteryIsOpen: true, batteryPopup: true })
    }

    closeBatteryModal() {
        this.setState({ modalForBatteryIsOpen: false, batteryPopup: false })
    }

    closePacketModal() {
        this.setState({ modalForPacketIsOpen: false, packetPopup: false })
    }

    openPacketPopup() {
        this.setState({ modalForPacketIsOpen: true, packetPopup: true })
    }

    render() {
        return (<div>
            <div className="">
                <h3 className="roof_subhead">Välj produkt</h3>
            </div>
            <div className="">
                <div className="seperation-line">
                    <div className="container">
                        <div className="col-md-12 heading_text font-quicksand bold" >Välj Solpaneler</div>
                        <div className="col-sm-12 col-sm-offset-3 material" style={{ textAlign: 'center', padding: '30px', margin: '0px auto' }}>
                            {this.state.validationOne ? (
                                <div className='validation' style={{ margin: '0px auto' }}><span>Please select the Panel type</span></div>
                            ) : (null)}
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-12 col-sm-12 align-text-center">
                        <div className="col-sm-6 col-md-6" id="panel-types">
                            {
                                this.panels.map((data, index) => {
                                    return (
                                        <div className="col-sm-6 col-md-6" key={index} onClick={this.selectedPanel.bind(this, data.name, data.cost, 'solpanel')} >
                                            <div className="onfocs_brdr b-white" style={(data.name == this.state.panel) ? selectedStyle : matstyle}>
                                                <img src={data.image} alt={data.name} className="img-responsive" />
                                                <br />
                                                <p className="m-top9 panel-font">{data.name} panel</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="col-sm-6 col-md-6" id="panel-types">
                            {
                                this.soltakPanels.map((data, index) => {
                                    return (
                                        <div className="col-sm-6 col-md-6" key={index} onClick={this.selectedPanel.bind(this, data.name, data.cost, 'soltak')} >
                                            <div className="onfocs_brdr b-white" style={(data.name == this.state.panel) ? selectedStyle : matstyle}>
                                                <img src={data.image} alt={data.name} className="img-responsive" />
                                                <br />
                                                <p className="m-top9 panel-font">{data.name} panel</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        </div>
                        <div className="col-md-12 col-sm-12 align-text-center">
                            <a className="hiperLink" onClick={this.openPanelPopup.bind(this)}>Läs mer om solpanel</a>
                            {this.state.panelPopup ? (
                                <div>
                                    <Modal
                                        isOpen={this.state.modalForPanelIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closePanelModal}
                                        style={customStyles}
                                        className="panel-modal"
                                        contentLabel="Example Modal">
                                        <div className="col-md-12 panding_no">
                                            <div className="boka-heading">Solpaneler</div>
                                            <div className="f-right">
                                                <button className="close-button " onClick={this.closePanelModal}>X</button>
                                            </div>
                                        </div>
                                        <div className="col-md-12 questionsPage padding-bottom-none">
                                            <div className="heading list-head">STANDARD SOLPANEL</div>
                                            <div className="p-10">
                                                <ul className="panels-list">
                                                    <li> - 275 kWh </li>
                                                    <li> - Panel ipolykristallin</li>
                                                    <li> - Passarbästförstorainstallationerpåexempelvisföretag, solcellsparkerochmarkanläggningar</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-12 questionsPage padding-top-none">
                                            <div className="heading list-head">PREMIUM SOLPANEL</div>
                                            <div className="p-10">
                                                <ul className="panels-list">
                                                    <li> - 320 kWh </li>
                                                    <li> - Panel imonokristallin</li>
                                                    <li> - Passarbästförvillordå den svartskimrandefärgenoftastärmeruppskattadänstandardpanelen</li>
                                                    <li> - Högreeffekt per panel görpanelenlämpligförmindretak</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="estimate col-md-12 align-text-center">
                                            <button className="submit float-none" onClick={this.closePanelModal}>stäng</button>
                                        </div>
                                    </Modal>
                                </div>
                            ) : (null)}
                        </div>

                    </div>
                </div>
                
                <div className="col-sm-12 ">
                    <div className="container">
                        <div className="col-md-12 heading_text font-quicksand bold" >välj antal solpaneler</div>
                        <div className="">
                            <div className="col-sm-12 material" style={{ textAlign: 'center', padding: '30px', margin: '0px auto' }}>
                                {this.state.validationThree ? (
                                    <div className='validation' style={{ margin: '0px auto' }}><span>Please select the packet type</span></div>
                                ) : (null)}
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-sm-12 col-md-10" id="panels-count">
                                {this.state.popup ? (
                                    <div>
                                        <Modal
                                            isOpen={this.state.modalIsOpen}
                                            onAfterOpen={this.afterOpenModal}
                                            onRequestClose={this.closeModal}
                                            style={customStyles}
                                            className="panel-modal"
                                            contentLabel="Specify packet">
                                            <div className="col-md-12 panding_no">
                                                <div className="boka-heading">Ange antal paneler</div>
                                                <div className="f-right">
                                                    <button className="close-button" onClick={this.closeModal}>X</button>
                                                </div>
                                            </div>
                                            <form>
                                                {this.state.panelCountValidation ?
                                                    (<div className="col-md-12 panels-valid-head">
                                                        <div className="panels-count-validation">
                                                            Panels range is {this.state.maximumPackets} - {this.state.minimumPackets}</div>
                                                    </div>) : (null)}

                                                <div className="col-md-12 align-text-center slots-centering ">
                                                    <div className="move-left">
                                                        <div onClick={this.increment.bind(this)}>
                                                            <img src="./img/caret-symbol.png" alt="increment" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <input id='counter' value={this.state.value} onChange={this.countOfpanels} />
                                                    </div>
                                                    <div className="move-left">
                                                        <div onClick={this.decrement.bind(this)}>
                                                            <img src="./img/down-arrow.png" alt='decrement' /> </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 booking-buttons align-text-center">
                                                    <button className="submit" onClick={this.closeModal}>Avbryt</button>
                                                    <button className="submit" disabled={this.state.panelCountValidation} onClick={this.selectedCount.bind(this, '', this.state.value)}>Ok</button>
                                                </div>
                                            </form>
                                        </Modal>
                                    </div>
                                ) : (null)}
                                {(this.state.panelName === 'solpanel' || this.state.panelName == undefined) ?  this.panelsArray.map((data, index) => {
                                    return (
                                        <div className="col-sm-6 col-md-3 panding_no" key={index} onClick={this.selectedCount.bind(this, data.packet, data.count)} >
                                            <div className="onfocs_brdr1 b-white solar-panel" style={(data.packet == this.state.packetName) ? selectedStyle : matstyle}>
                                                {(data.packet === "Custom paket" && this.state.customPacket == "Ange antal paneler") ? (
                                                    <div className='f21 text-capital specify-card'>{data.count}</div>
                                                ) : (
                                                        <div className='packets-font'>{data.count}</div>
                                                    )}
                                                <br />
                                                <br />
                                                <p className="m-top9">{data.packet}</p>
                                            </div>
                                        </div>
                                    )
                                    
                                }): null}
                                {(this.state.panelName === 'soltak'  && this.state.panelName !== undefined) ?  this.soltakPanelsArray.map((data,index)=>{
                                     return (
                                        <div className="col-sm-6 col-md-3 panding_no" key={index} onClick={this.selectedCount.bind(this, data.packet, data.count, "Specify the area of solar roof")} >
                                            <div className="onfocs_brdr1 b-white solar-panel" style={(data.packet == this.state.packetName) ? selectedStyle : matstyle}>
                                                {(data.packet === "Custom paket" && this.state.soltakCustomPaket == "Specify the area of solar roof") ? (
                                                    <div className='f21 text-capital specify-card'>{data.count}</div>
                                                ) : (
                                                        <div className='packets-font'>{data.count}</div>
                                                    )}
                                                <br />
                                                <br />
                                                <p className="m-top9">{data.packet}</p>
                                            </div>
                                        </div>
                                    )
                                }) : null}
                            </div>
                            <div className="col-md-12 col-sm-12 align-text-center">
                                {this.state.packetPopup && this.state.panel && this.state.panelName == 'solpanel' ? (
                                    <div>
                                        <div className="col-md-1"></div>
                                        <div className="col-md-10 col-sm-12 panding_no panel-count-info-border">
                                            <div className="col-sm-6 col-md-4 panding_no">
                                                <div className="list-head">
                                                    <p className="panel-count-info">MAX ANTAL SOLARPANELER<br />(Takyta har plats for)</p>
                                                    <div className='panel-values-info'>
                                                        {this.state.maximumPackets}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4 panding_no">
                                                <div className="list-head">
                                                    <p className="panel-count-info">VALT ANTAL SOLARPANELER</p>
                                                    <br />
                                                    <div className='panel-values-info'>{this.state.packetsCount}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4 panding_no">
                                                <div className="list-head">
                                                    <p className="panel-count-info">EFFEKT</p>
                                                    <br />
                                                    <div className='panel-values-info no-border'>{totalInstalledPowerInkw}
                                                        <span> kWh</span></div>
                                                </div>
                                            </div>
                                            {/* <div className="col-sm-6 col-md-3 panding_no">
                                                <div className="list-head">
                                                    <p className="panel-count-info">ÅRSPRODUKTION</p>
                                                    <br />
                                                    <div className='panel-values-info'>{parseInt(this.state.annualOutput)}
                                                        <span> KWh</span>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                ) : (
                                        null
                                    )}
                                    {this.state.packetPopup && this.state.panel && this.state.panelName == 'soltak' ? (
                                    <div>
                                        <div className="col-md-1"></div>
                                        <div className="col-md-10 col-sm-12 panding_no panel-count-info-border">
                                            <div className="col-sm-6 col-md-4 panding_no">
                                                <div className="list-head">
                                                    <p className="panel-count-info">Tak YTA</p>
                                                    <div className='panel-values-info no-border'>
                                                        {this.state.maximumPackets}
                                                        <span> kvm</span></div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4 panding_no">
                                                <div className="list-head">
                                                    <p className="panel-count-info">VALT SOLTAK YTA</p>
                                                    <br />
                                                    <div className='panel-values-info'>{this.state.packetsCount}</div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4 panding_no">
                                                <div className="list-head">
                                                    <p className="panel-count-info">EFFEKT</p>
                                                    <br />
                                                    <div className='panel-values-info no-border'>{totalInstalledPowerInkw}
                                                        <span> kWh</span></div>
                                                </div>
                                            </div>
                                            {/* <div className="col-sm-6 col-md-3 panding_no">
                                                <div className="list-head">
                                                    <p className="panel-count-info">ÅRSPRODUKTION</p>
                                                    <br />
                                                    <div className='panel-values-info'>{parseInt(this.state.annualOutput)}
                                                        <span> KWh</span>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                ) : (
                                        null
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 center-line-seperation">
                    <div className="container">
                        <div className="col-md-12 heading_text font-quicksand bold" >välj Batteri</div>
                        <div className="col-sm-12 material" style={{ textAlign: 'center', padding: '30px', margin: '0px auto' }}>
                            {this.state.validationTwo ? (
                                <div className='validation' style={{ margin: '0px auto' }}><span>Please select the Battery type</span></div>
                            ) : (null)}
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-sm-12 col-md-10" id="battery-types">
                            {
                                this.batteries.map((data, index) => {
                                    return (
                                        <div className="col-sm-6 col-md-4" key={index} onClick={this.selectedBattery.bind(this, data.name, data.cost)} >
                                            <div className="onfocs_brdr b-white" style={(data.name == this.state.battery) ? selectedStyle : matstyle}>
                                                <img src={data.image} alt={data.name} className="img-responsive" />
                                                <br />
                                                <p className="m-top9">{data.name} batteri</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="col-md-12 col-sm-12 align-text-center">
                            <a className="hiperLink" onClick={this.openBatteryPopup.bind(this)}>Läs mer om batteri</a>
                            {this.state.batteryPopup ? (
                                <div>
                                    <Modal
                                        isOpen={this.state.modalForBatteryIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeBatteryModal}
                                        style={customStyles}
                                        className="panel-modal"
                                        contentLabel="Example Modal">
                                        <div className="col-md-12 panding_no">
                                            <div className="boka-heading">BATTERI</div>
                                            <div className="f-right">
                                                <button className="close-button " onClick={this.closeBatteryModal}>X</button>
                                            </div>
                                        </div>
                                        <div className="questionsPage padding-bottom-none">
                                            <div className="heading list-head">PREMIUM BATTERI</div>
                                            <div className="p-10">
                                                <ul className="panels-list">
                                                    <li> - 11,4 kWh effekt </li>
                                                    <li> - Strömäven vid strömavbrott</li>
                                                    <li> - VäxelriktareochbatterigenomBatterX.</li>
                                                    <li> - Möjlighet till strömlagringfrånsolpaneler</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="questionsPage padding-top-none">
                                            <div className="heading list-head">UTAN BATTERI</div>
                                            <div className="p-10">
                                                <ul className="panels-list">
                                                    <li> - Sälj din överskottseldirekt till elbolaget</li>
                                                    <li> - Panel imonokristallin</li>
                                                    <li> - Passarbästförvillordå den svartskimrandefärgenoftastärmeruppskattadänstandardpanelen</li>
                                                    <li> - Högreeffekt per panel görpanelenlämpligförmindretak</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="estimate align-text-center">
                                            <button className="submit float-none" onClick={this.closeBatteryModal}>stäng</button>
                                        </div>
                                    </Modal>
                                </div>

                            ) : (null)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 estimate" style={{ textAlign: 'center', padding: '30px' }} >
                {this.state.panel && this.state.battery ? (
                    <div className="flex justifyCenter">
                        <div className="padding1">
                            <button onClick={this.props.back.bind(this, 4)} className="submit" >Föregående</button>
                        </div>
                        <div className="padding1">
                            <button onClick={this.props.panelTypes.bind(this, this.state.panel, this.state.battery, parseInt(this.state.packetsCount), this.state.packetName, parseInt(this.state.annualOutput))} className="submit" >Slutför</button>
                        </div>
                    </div>
                ) : (
                        <div className="flex justifyCenter">
                            <div className="padding1">
                                <button onClick={this.props.back.bind(this, 4)} className="submit" >Föregående</button>
                            </div>
                            <div className="padding1">
                                <button onClick={this.validate} className="submit" >Slutför</button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
        )
    }
}
export default PanelComponent;