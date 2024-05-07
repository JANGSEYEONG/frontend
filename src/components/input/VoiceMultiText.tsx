import useVoiceMultiText from '@hooks/useVoiceMutlText';
import styled, { keyframes } from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { flexCenter, flexColumnCenter, mainSection } from '@styles/CommonStyles';
import { MikeBtn } from '@components/button';
import { useEffect } from 'react';

// react hook form + FormProvider 전용..
type VoiceMultiTextProps = {
  hookFormFieldName: string;
  title?: string;
  placeholder?: string;
  isRequired?: boolean;
};

const VoiceMultiText = ({
  hookFormFieldName,
  title = '내용',
  placeholder = '',
  isRequired = false,
}: VoiceMultiTextProps) => {
  const {
    register,
    watch,
    // formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const textValue = watch(hookFormFieldName); // 'message' 필드의 현재 값을 실시간으로 관찰
  const maxLength = 300;

  const handleVoiceResult = (result: string) => {
    const currentValue = getValues(hookFormFieldName);
    setValue(hookFormFieldName, currentValue ? `${currentValue} ${result}` : result);
  };

  // 필드 별로 생성 필요함
  const [startListen, isListening, stopListen] = useVoiceMultiText(handleVoiceResult);

  const handleVoiceClick = () => {
    try {
      if (isListening) {
        stopListen();
      } else {
        startListen({ interimResults: false });
      }
    } catch (err) {
      alert(err);
      stopListen();
    }
  };

  useEffect(() => {
    // unmount 시 recognize stop 필요
    return () => {
      stopListen();
    };
  }, [stopListen]);

  return (
    <Container>
      <TextAreaWrapper>
        <span className="title">{title}</span>
        <TextArea
          maxLength={maxLength}
          placeholder={placeholder}
          {...register(hookFormFieldName, { required: isRequired })}
        />
        <span className="count">{`${textValue?.length || 0}/${maxLength}`}</span>
      </TextAreaWrapper>
      <VoiceButton listening={isListening.toString()} onClick={handleVoiceClick}>
        {isListening ? (
          <>
            <Bar delay={0} />
            <Bar delay={0.2} />
            <Bar delay={0.4} />
            <Bar delay={0.6} />
            <Bar delay={0.8} />
          </>
        ) : (
          <MikeBtn />
        )}
      </VoiceButton>
    </Container>
  );
};
export default VoiceMultiText;

const Container = styled.div`
  ${flexCenter}
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const TextAreaWrapper = styled.div`
  ${mainSection}
  ${flexColumnCenter}
  justify-content: flex-start;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2px;
  width: 100%;
  height: 100px;
  gap: 2px;

  & span.title {
    font-size: 12px;
    font-weight: 300;
    color: #9f9f9f;
    width: 100%;
    flex-shrink: 0;
  }

  & span.count {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 10px;
    font-weight: 400;
    color: #9f9f9f;
    width: 100%;
    flex-shrink: 0;
    margin-bottom: 3px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #bcbcbc;
  }
`;

const VoiceButton = styled.div<{ listening: string }>`
  ${flexCenter}
  justify-content: space-around;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 6px;
  border-radius: 6px;
  background-color: ${(props) => (props.listening === 'true' ? '#47CFB0' : '#dddddd')};
  box-shadow: ${(props) => props.theme.shadows.around};
  &:hover {
    background-color: ${(props) => (props.listening === 'true' ? '#3bb095' : '#d1d1d1')};
  }
`;

// 음성 인식 애니메이션 정의
const pulse = keyframes`
  0%, 100% { height: 10px; }
  50% { height: 20px; }
`;

// 음석 인식 중 개별 막대 스타일
const Bar = styled.div<{ delay: number }>`
  width: 5px;
  height: 9px;
  border-radius: 100px;
  background-color: #fff;
  animation: ${pulse} 1s infinite ease-in-out;
  animation-delay: ${(props) => props.delay}s;
`;