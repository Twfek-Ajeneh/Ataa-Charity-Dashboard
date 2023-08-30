// import react
import React , { useRef, useState } from 'react';
import { Swiper , SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper';
import { Link } from 'react-router-dom';

// import components
import MainLogo from '../../Icons/MainLogo';
import AndroidIcon from '../../Icons/Home-page/AndroidIcon';
import FooterIcon from '../../Icons/Home-page/FooterIcon';
import CopyRightIcon from '../../Icons/Home-page/CopyRightIcon';
import ContactUsImage from '../../Icons/Home-page/ContactUsImage';
import ArrowIcon from '../../Icons/Home-page/ArrowIcon';

//import tools ans static date
import { landingItem , serviceItem , contactUsItem} from '../../tools/static data/HomePageData';

// import style sheet
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Home.css';

const Home = () => {
	const [imageIndex , setImageIndex] = useState(0);
	const menu = useRef();

	const handleMenu = () => {
		if(window.matchMedia('(max-width: 767px)').matches){
			menu.current.style.display = menu.current.style.display === 'flex' ? 'none' : 'flex';
		}
	}

	window.onresize = () => {
		if(window.matchMedia('(min-width: 780px)').matches){
			if(menu.current !== null) menu.current.style.display = 'block';
		}
		if(window.matchMedia('(max-width: 767px)').matches){
			if(menu.current !== null) menu.current.style.display = 'none';
		}
	}

	return (  
		<div className="home">

			{/* start landing section */}
			<div id="landing-page" className="landing-page">
				<div className="landing-header">
					<div className="home-logo"><MainLogo width={43} height={47}/></div>
					<div className="links-container" onClick={handleMenu}></div>
					<ul className="links" onClick={handleMenu} ref={menu}>
						<li><a href="#landing-page">الصفحة الرئيسية</a></li>
						<li><a href="#about-page">لمحة عن الجمعية</a></li>
						<li><a href="#service-page">خدمات</a></li>
						<li><a href="#contact-us">تواصل معنا</a></li>
						<li className="download-button"><Link to='/login' className='download-link'>تسجيل الدخول</Link></li>
					</ul>
				</div>
				<div className="container">
					<div className="landing-body">
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={100}
							slidesPerView={1}
							navigation
							pagination={{clickable : true}}
							onSlideChange={(swiper) => {setImageIndex(swiper.activeIndex)}}
						>
							{landingItem.map((item , index) => (
								<SwiperSlide key={index}>
									<img src={item.src} alt="ads"/>
								</SwiperSlide>
							))}
							<div className="landing-layer">
								<p>
									{landingItem[imageIndex].text}
								</p>
							</div>
						</Swiper>
					</div>
				</div>
			</div>
			{/* end landing section */}

			{/* start About section */}
			<div id="about-page" className="about-page">
				<div className="container">
					<h2 className="main-heading">لمحة عن الجمعية</h2>
					<div className="about-content">
						<div className="about-text">
							<p>
								عطاء , حل برمجي يأتي تلبية لادارة شؤون الجمعيات الخيرية الغير ربحية، حيث يقوم بإدارة التبرعات
								وتنظيمها.
							</p>
							<p>
							تقدم الجمعية نظاماً إدارياً متكاملاً وتجمع آخر المستجدات التقنية لتسخيرها في العمل الخيري،
							و ذلك لمساعدة الجمعيات والمؤسسات الخيرية للعمل بكفاءة أعلى من خلال أتمتة جميع العمليات
							الداخلية والمعاملات المالية بصورة تعود بالنفع على كل العناصر المعنية ابتداءً بالمتبرعين والجمعيات 
							و الدائرة وصولا إلى المستفيدين من هذه التبرعات، وتوفر بوابة عطاء خدمة دفع إلكتروني موثوقة 
							و آمنة وموحدة عبر البوابة والهواتف الذكية.
							</p>
						</div>
						<div className="about-image">
							<MainLogo width={320} height={350} /> 
						</div>
					</div>
				</div>
			</div>
			{/* end About section */}

			{/* start service section */}
			<div id="service-page" className="service-page">
				<div className="container">
					<h2 className="main-heading">خدمات</h2>
					<div className="service-content">
						{serviceItem.map((card , index) => (
							<div key={index} className="service-card"> 
								{card.logo}
								<p>{card.text}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* end service section */}

			{/* start phone section*/}
			<div className="phone-page">
				<div className="container">
					<div className="phone-content">
						<div className="phone-text">
							<p>التطوع هو تقديم المساعدة و العون و الجهد من أجل العمل على تحقيق الخير في المجتمع عموماً ولأفراده خصوصاً, واطلق عليه مسمى عمل تطوعي لان الانسان يقوم به طواعية دون إجبار من الغير, فهو ارادة داخلية , وغلبة لسلطة الخير على جانب الشر, ودليل على إزدهار المجتمع.</p>
							<p>حمل التطبيق للقيام بالتبرع و التطوع</p>
							<a href='./app-debug.apk' download='Ataa'>
								<div className="phone-button-content">
									<p>حمل التطبيق للأندرويد</p>
									<AndroidIcon />
								</div>
							</a>
						</div>
						<div className="phone-image">
							<img src="/images/Home-page/Mobile-image.png" alt="mobile"/>
						</div>
					</div>
				</div>
			</div>
			{/* end phone section*/}

			{/* start contact us section */}
			<div id="contact-us" className="contact-us">
				<div className="container">
						<h2 className="main-heading">تواصل معنا</h2>
						<div className="contact-us-content">
							<div className="contact-us-text">
								{contactUsItem.map((item , index) => (
									<div key={index} className="contact-us-item">
										{item.logo}
										<span></span>
										{item.text}
									</div>
								))}
							</div>
							<div className="contact-us-image">
								<ContactUsImage />
							</div>
						</div>
				</div>
			</div>
			{/* end contact us section */}

			{/* start footer */}
			<div className="footer">
				<FooterIcon />
				<p>جميع الحقوق محفوظة لجمعية عطاء 2022</p>
				<CopyRightIcon />
			</div>
			{/* end footer */}
			
			{/* start button to top */}
			<div className='button-to-top' onClick={() => {window.scrollTo(0 , 0)}}>
				<ArrowIcon />
			</div>
			{/* end button to top */}
		</div>
	);
}

export default Home;