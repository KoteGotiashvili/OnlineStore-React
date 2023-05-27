import React from 'react'

const ContactInfo = () => {
    return (
        <div className='contactInfo container'>
            <div className='row'>
                <div className='col-12 col-md-4 contact-Box'>
                    <div className='box-info'>
                        <div className='info-image'>
                            <i className='fas fa-phone-alt'></i>
                        </div>
                        <h5>დარეკეთ 24x7</h5>
                        <p>591 88 56 28</p>
                    </div>
                </div>
                <div className='col-12 col-md-4 contact-Box'>
                    <div className='box-info'>
                        <div className='info-image'>
                            <i class="fa fa-globe" aria-hidden="true"></i>
                        </div>
                        <h5>ქალაქი</h5>
                        <p>ქუთაისი</p>
                    </div>

                </div>

                <div className='col-12 col-md-4 contact-Box'>
                    <div className='box-info'>
                        <div className='info-image'>
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </div>
                        <h5>გიმაილი</h5>
                        <p>komadekomade@gmail.com</p>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default ContactInfo