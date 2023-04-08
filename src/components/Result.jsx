import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoIosCopy } from "react-icons/io";

const Result = (props) => {
	const { result, result2 } = props;
	const ref = useRef(null);
	const scrollToBottom = () => {
		ref.current.scrollIntoView({ behavior: "smooth" });
	};
	const [codestring, setCodestring] = useState("");
	const onChangeContentInput = useCallback(
		(e) => {
			setCodestring(e.target.value);
		},
		[codestring]
	);
	useEffect(() => {
		setCodestring(result + result2);
	}, []);
	useEffect(() => {
		scrollToBottom();
	}, [codestring]);
	return (
		<>
			<Border />
			<Title>Readme가 성공적으로 생성되었습니다!</Title>
			<TitleDes>
				우측 코드박스에서 부족한 부분을 수정하시고,
				좌측 Markdown Preview 페이지에서 확인하세요!
			</TitleDes>
			<BoxWrapper>
				{codestring && (
					<>
						<PreviewBox>
							<ReactMarkdown
								children={codestring}
								remarkPlugins={[remarkGfm]}
							/>
						</PreviewBox>
						<CodeBox
							name="code"
							onChange={onChangeContentInput}
							autoComplete="off"
						>
							{codestring}
						</CodeBox>
						<CopyToClipboard
							text={codestring}
							onCopy={() =>
								alert(
									"코드가 복사되었습니다! 어디든지 코드를 붙여넣을 수 있습니다."
								)
							}
						>
							<CopyButton>
								<IoIosCopy fill="#051027" size="25" />
							</CopyButton>
						</CopyToClipboard>
					</>
				)}
			</BoxWrapper>
			<div ref={ref}> </div>
		</>
	);
};

export default Result;

const Border = styled.div`
	border-bottom: 1px solid #ffffff;
	width: 90%;
	margin-top: 50px;
`;

const Title = styled.div`
	color: #ffffff;
	font-family: "Pretendard";
	font-size: 30px;
	font-weight: 600;
	margin: 40px 0 20px 0;
`;

const TitleDes = styled.div`
	width: 50%;
	text-align: center;
	font-family: "Pretendard";
	color: #f0f0f0;
	margin-bottom: 40px;
	word-break: keep-all;
`;

const BoxWrapper = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 100px;
	position: relative;
	@media (max-width: 760px) {
		flex-direction: column;
		align-items: center;
	}
`;

const PreviewBox = styled.div`
	width: 45%;
	word-break: keep-all;
	font-family: "Pretendard";
	padding: 15px;
	background-color: #ffffff;
	@media (max-width: 760px) {
		width: 90%;
		height: auto;
	}
`;

const CodeBox = styled.textarea`
	width: 45%;
	white-space: pre-wrap;
	font-family: "Pretendard";
	padding: 15px;
	background-color: #ffffff;
	border: 0;
	outline: 0;
	resize: none;
	@media (max-width: 760px) {
		width: 90%;
		height: 300px;
		margin-top: 20px;
	}
`;

const CopyButton = styled.div`
	position: absolute;
	bottom: 20px;
	right: 20px;
	cursor: pointer;
	width: 45px;
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #c1cdde;
	box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.4);
	border-radius: 50%;
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 14px;
	margin-top: 10px;
	@media (max-width: 760px) {
		right: 40px;
	}
`;
