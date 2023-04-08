import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Result from "./Result";
import { BsGithub } from "react-icons/bs";
import { GPT3 } from "../api/OpenAI";
import Loader from "react-spinners/PulseLoader";

const Main = () => {
	useEffect(() => {
		setIsResult(false);
		setResult("");
	}, []);
	const [strings, setStrings] = useState({
		url: "",
		title: "",
		detail: "",
		tech: "",
		team: "",
	});
	const onChangeURLInput = useCallback(
		(e) => {
			setStrings({ ...strings, url: e.target.value });
		},
		[strings]
	);
	const onChangeTitleInput = useCallback(
		(e) => {
			setStrings({ ...strings, title: e.target.value });
		},
		[strings]
	);
	const onChangeDetailInput = useCallback(
		(e) => {
			setStrings({ ...strings, detail: e.target.value });
		},
		[strings]
	);
	const onChangeTechInput = useCallback(
		(e) => {
			setStrings({ ...strings, tech: e.target.value });
		},
		[strings]
	);
	const onChangeTeamInput = useCallback(
		(e) => {
			setStrings({ ...strings, team: e.target.value });
		},
		[strings]
	);
	const [isResult, setIsResult] = useState(false);
	const [isResult2, setIsResult2] = useState(false);
	const [result, setResult] = useState("");
	const [result2, setResult2] = useState("");
	const [loading, setLoading] = useState(false);
	const PrePost = () => {
		//console.log(strings);
		if (
			strings.url === "" ||
			strings.title === "" ||
			strings.detail === "" ||
			strings.tech === "" ||
			strings.team === ""
		) {
			alert("모든 필드가 올바르게 채워져야만 Readme.md를 생성할 수 있습니다.");
		} else {
			setLoading(true);
			GPT3.askGPT(strings)
				.then((res) => {
					//console.log(res);
					setResult(res.data.choices[0].message.content);
					GPT3.getDirectory(strings)
						.then((res) => {
							//console.log(res);
							setResult2(res.data.choices[0].message.content);
							setLoading(false);
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		}
	};
	useEffect(() => {
		//console.log("gpt 응답 : ", result);
		if (result !== "" && result !== undefined) {
			setIsResult(true);
		} else setIsResult(false);
	}, [result]);
	useEffect(() => {
		//console.log("gpt 응답 : ", result2);
		if (result2 !== "" && result2 !== undefined) {
			setIsResult2(true);
		} else setIsResult2(false);
	}, [result2]);
	return (
		<Container
			style={{ height: isResult ? (isResult2 ? "100%" : "100vh") : "100vh" }}
		>
			<Top href="https://github.com/tristan-kkim/ChatGPT-Readme-Generator.git" target="_blank">
				<BsGithub fill="#ffffff" size="20" />
			</Top>
			<Title
				style={{ marginTop: isResult ? (isResult2 ? "30px" : "0px") : "0px" }}
			>
				Github Readme Generator KR 
			</Title>
			<TitleDes>
				Repository 링크를 첨부하시고 ChatGPT에 설명할 간단한 소개만 있다면,
				귀찮게 작성했던 Readme.md 파일을 생성해드립니다!
			</TitleDes>
			<LinkInput
				onChange={onChangeURLInput}
				placeholder="Public Repository 주소를 입력해주세요"
			/>
			<SubTitle>📛 프로젝트명 </SubTitle>
			<NameInput
				onChange={onChangeTitleInput}
				placeholder="이 프로젝트의 이름은 무엇인가요?"
			/>
			<SubTitle>💁간단한 프로젝트 소개</SubTitle>
			<DetailInput
				onChange={onChangeDetailInput}
				placeholder="하이픈을 달아 개괄적으로 프로젝트에 대해 소개해주세요!"
				style={{ width: "50%" }}
			/>
			<SubTitle>🛠️ 기술스택</SubTitle>
			<TechInput
				onChange={onChangeTechInput}
				placeholder="기술스택을 쉼표로 구분해주세요!"
			/>
			<SubTitle>🙍 구성원 소개</SubTitle>
			<TeamInput
				onChange={onChangeTeamInput}
				placeholder="구성원의 이름과 기여한 부분에 대해 간단히 작성해주세요"
				style={{ width: "50%" }}
			/>
			<Button
				onClick={() => {
					PrePost();
				}}
			>
				{loading ? "✏️ GPT3.5가 열심히 Repository를 들여다보고 있습니다. " : "🔄Generating Readme.md🔄"}
			</Button>
			{isResult ? (
				result ? (
					result2 ? (
						<Result result={result} result2={result2} />
					) : null
				) : null
			) : null}
			<div
				style={{
					position: "absolute",
					bottom: "0px",
					zIndex: "1000",
				}}
			>
				<Loader
					color="#ffffff"
					speedMultiplier="0.7"
					size="10"
					margin="5"
					loading={loading}
				/>
			</div>
		</Container>
	);
};

export default Main;

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: linear-gradient(180deg, #051e48 0%, #051027 100%);
`;

const Top = styled.a`
	cursor: pointer;
	position: absolute;
	top: 20px;
	right: 20px;
	text-decoration: none;
`;

const Title = styled.div`
	color: #ffffff;
	font-family: "Pretendard";
	font-size: 30px;
	font-weight: 600;
	margin: 10px 0;
`;

const TitleDes = styled.div`
	width: 50%;
	text-align: center;
	font-family: "Pretendard";
	color: #f0f0f0;
	margin-bottom: 30px;
	word-break: keep-all;
`;

const LinkInput = styled.input`
	width: 40%;
	height: 20px;
	padding: 5px;
	font-size: 14px;
	margin-bottom: 20px;
	border-radius: 8px;
	border: 0;
`;

const SubTitle = styled.div`
	font-family: "Pretendard";
	color: #ffffff;
	font-size: 20px;
	margin: 10px 0;
`;

const NameInput = styled.input`
	width: 20%;
	height: 20px;
	padding: 5px;
	font-size: 14px;
	margin-bottom: 20px;
	border-radius: 8px;
	border: 0;
`;

const DetailInput = styled.textarea`
	height: 50px;
	padding: 5px;
	font-size: 14px;
	margin-bottom: 20px;
	border-radius: 8px;
	border: 0;
	resize: none;
`;

const TechInput = styled.input`
	width: 40%;
	height: 20px;
	padding: 5px;
	font-size: 14px;
	margin-bottom: 20px;
	border-radius: 8px;
	border: 0;
`;

const TeamInput = styled.textarea`
	height: 40px;
	padding: 5px;
	font-size: 14px;
	margin-bottom: 20px;
	border-radius: 8px;
	border: 0;
	resize: none;
`;

const Button = styled.div`
	cursor: pointer;
	min-width: 160px;
	height: 34px;
	padding: 0 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #c1cdde;
	box-shadow: 0px 0px 15px 3px rgba(255, 255, 255, 0.6);
	color: #051027;
	border-radius: 17px;
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 18px;
	margin-top: 10px;
`;
