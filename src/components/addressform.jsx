import React, { useEffect, useState } from "react";
import "../css/address.css";

function AddressForm({ onAddressSelect }) {
	const [detailAddress, setDetailAddress] = useState("");

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
		script.async = true;
		script.onload = () => {
			console.log("Daum Postcode script loaded");
		};
		document.head.appendChild(script);
	}, []);

	const sample_execDaumPostcode = () => {
		new window.daum.Postcode({
			oncomplete: function (data) {
				let addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
				let extraAddr = "";

				if (data.userSelectedType === "R") {
					if (data.bname && /[동|로|가]$/g.test(data.bname)) {
						extraAddr += data.bname;
					}
					if (data.buildingName && data.apartment === "Y") {
						extraAddr += extraAddr ? `, ${data.buildingName}` : data.buildingName;
					}
					if (extraAddr) {
						extraAddr = ` (${extraAddr})`;
					}
				}

				const postcodeElement = document.getElementById("sample_postcode");
				const addressElement = document.getElementById("sample_address");
				const extraAddressElement = document.getElementById("sample_extraAddress");

				if (postcodeElement) postcodeElement.value = data.zonecode;
				if (addressElement) addressElement.value = addr;
				if (extraAddressElement) extraAddressElement.value = extraAddr;

				// Pass the selected address data to the parent component
				if (onAddressSelect) {
					onAddressSelect({
						postcode: data.zonecode,
						city: data.sido || "",
						district: data.sigungu || "",
						dong: data.bname || "",
						detail_location: detailAddress,
					});
				}
			},
		}).open();
	};

	const handleClick = () => {
		sample_execDaumPostcode();
	};

	const handleDetailAddressChange = (event) => {
		setDetailAddress(event.target.value);
	};

	return (
		<div className='addressdiv'>
			<input type='button' className='postcode' onClick={handleClick} value='우편번호 찾기' />
			<div className='autoword'>
				<input type='text' id='sample_postcode' placeholder='우편번호' readOnly />
				<input type='text' id='sample_address' placeholder='주소' readOnly />
				<input type='text' id='sample_extraAddress' placeholder='참고항목' readOnly />
				<input type='text' id='sample_detailAddress' placeholder='상세주소' />
			</div>
		</div>
	);
}

export default AddressForm;
