import React, { useEffect, useState } from "react";
import "../css/address.css";

const user = {
	name: "tom",
	address: "",
};

function AddressForm({ onAddressSelect }) {
	const [detailAddress, setDetailAddress] = useState("");

	useEffect(() => {
		// Load Daum Postcode script dynamically
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

				let usergooaddress = data.sigungu || "";

				user.address = addr + extraAddr;

				// Call the parent callback with the address data
				if (onAddressSelect) {
					onAddressSelect({
						postcode: data.zonecode,
						address: addr,
						extraAddress: extraAddr,
						sigungu: usergooaddress,
						detailAddress, // Include the detailed address entered by the user
					});
				}
			},
		}).open();
	};

	const handleClick = () => {
		// Clear the input fields
		document.getElementById("sample_postcode").value = "";
		document.getElementById("sample_address").value = "";
		document.getElementById("sample_extraAddress").value = "";
		// Execute the Daum Postcode function
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
				<input
					type='text'
					id='sample_detailAddress'
					placeholder='상세주소'
					value={detailAddress}
					onChange={handleDetailAddressChange}
				/>
			</div>
		</div>
	);
}

export default AddressForm;
