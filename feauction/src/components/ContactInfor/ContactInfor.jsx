import './ContactInfor.scss';
import { FaHeadset } from 'react-icons/fa';
import { ImLocation2 } from 'react-icons/im';
import { IoIosPaperPlane } from 'react-icons/io';
const ContactInfor = () => {
    return (
        <div className="cover-home">
            <div className="container flex-center">
                <div className="infor flex-center">
                    <h1>Contact Us</h1>
                    <p>
                        We are AliThemes , a creative and dedicated group of individuals who love web development almost
                        as much as we love our customers. We are passionate team with the mission for achieving the
                        perfection in web design. All designs are made by love with pixel perfect design and excellent
                        coding quality. Speed, security and SEO friendly alway in our mind.
                    </p>
                    <div className="text-centerw">
                        <div className="text-item">
                            <div className="text-item-icon">
                                <FaHeadset />
                            </div>
                            <div className="text-item-contact">
                                <span>0929-999-939</span>
                            </div>
                        </div>

                        <div className="text-item">
                            <div className="text-item-icon">
                                <ImLocation2 />
                            </div>
                            <div className="text-item-contact">
                                <span>Cau Giay, HaNoi, Vietnam</span>
                            </div>
                        </div>

                        <div className="text-item">
                            <div className="text-item-icon">
                                <IoIosPaperPlane />
                            </div>
                            <div className="text-item-contact">
                                <span>support.bidviet@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map-img">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15222.703315832889!2d105.77925873386371!3d21.027552828390327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4c782f2d75%3A0xb182c41bb6dbede2!2zMTggUC4gRHV5IFTDom4sIEThu4tjaCBW4buNbmcgSOG6rXUsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1677641419286!5m2!1svi!2s"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <div className="contact">
                    <div className="drop-line">
                        <h3 className="main-line">Drop Us a Line</h3>
                        <p className="decr-line">
                            Your email address will not be published. Required fields are marked *
                        </p>
                    </div>
                    <div className="send-infor">
                        <input type="text" placeholder="Email *" />
                        <input type="text" placeholder="Subject *" />
                        <textarea type="text" placeholder="Message *"></textarea>
                    </div>
                    <button className="send-mesage">Send Message</button>
                </div>
            </div>
        </div>
    );
};
export default ContactInfor;
