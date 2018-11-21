import React, { Component } from 'react'
class Faq extends Component
{
    constructor(props)
    {
super(props)
    }

    render()
    {
        return(<div>
<div id="aboutus-image"><div className="container about_txt"><h2>FAQ'S</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>



</div></div>

<div className="container faqs_below">
    <h3> Find answers to common questions</h3>
<div className="row">
<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div className="panel panel-default">
        <div className="panel-heading" role="tab" id="headingOne">
             <h4 className="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </a>
      </h4>

        </div>
        <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.</div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading" role="tab" id="headingTwo">
             <h4 className="panel-title">
        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </a>
      </h4>

        </div>
        <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</div>
        </div>
    </div>
    <div className="panel panel-default">
        <div className="panel-heading" role="tab" id="headingThree">
             <h4 className="panel-title">
        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </a>
      </h4>

        </div>
        <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            <div className="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. </div>
        </div>
    </div>
</div>
</div>
</div> 


        </div>)
    }

}
export default Faq