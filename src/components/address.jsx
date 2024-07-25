import React, { useEffect } from "react"

function AddressForm() {
	useEffect(() => {
		const script = document.createElement("script")
		script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
		script.async = true
		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [])

	const sample_execDaumPostcode = () => {
		new daum.Postcode({
			oncomplete: function (data) {
				var addr = ""
				var extraAddr = ""

				if (data.userSelectedType === "R") {
					addr = data.roadAddress
				} else {
					addr = data.jibunAddress
				}

				if (data.userSelectedType === "R") {
					if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
						extraAddr += data.bname
					}
					if (data.buildingName !== "" && data.apartment === "Y") {
						extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName
					}
					if (extraAddr !== "") {
						extraAddr = " (" + extraAddr + ")"
					}
					document.getElementById("sample_extraAddress").value = extraAddr
				} else {
					document.getElementById("sample_extraAddress").value = ""
				}

				document.getElementById("sample_postcode").value = data.zonecode
				document.getElementById("sample_address").value = addr
				document.getElementById("sample_detailAddress").focus()
			},
		}).open()
	}

	return (
		<div>
			<input type='text' id='sample_postcode' placeholder='우편번호' />
			<input type='button' onClick={sample_execDaumPostcode} value='우편번호 찾기' />
			<br />
			<input type='text' id='sample_address' placeholder='주소' />
			<br />
			<input type='text' id='sample_detailAddress' placeholder='상세주소' />
			<input type='text' id='sample_extraAddress' placeholder='참고항목' />
		</div>
	)
}

export default AddressForm
