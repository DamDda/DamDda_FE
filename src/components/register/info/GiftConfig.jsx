import { BlueButtonComponent } from "components/common/ButtonComponent";
import Form from "./Form";
import { InputBox } from "components/common/InputBoxComponent";
import { DeleteButtonTrash } from "components/common/Gift/DeleteButtons";

const GiftConfig = (props) => {
  const {
    reward_name,
    setReward_name,
    setOptionType,
    optionType,
    OptionInput,
    setOptionInput,
    handleOptionAdd,
    Options,
    handleOptionDelete,
    handleGiftAdd,
    reward_list,
    handleGiftDelete,
  } = props;
  return (
    <div className="text-section">
      <h3>선물 옵션</h3>
      <Form title={"선물 이름"}>
        <InputBox
          label=""
          value={reward_name}
          onChange={(e) => setReward_name(e.target.value)}
          tooltip={"선물 이름을 적어주세요."}
        />
      </Form>
      <Form title={"옵션 조건"}>
        <div className="button-group">
          <BlueButtonComponent
            text="없음"
            onClick={() => setOptionType("none")}
          />
          <BlueButtonComponent
            text="선택식"
            onClick={() => setOptionType("select")}
          />
        </div>
      </Form>
      {optionType === "select" && (
        <>
          <Form title="옵션 항목">
            <div className="button-group">
              <InputBox
                label=""
                value={OptionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                tooltip={"옵션을 입력해주세요."}
              />
              <BlueButtonComponent text="+" onClick={handleOptionAdd} />
            </div>
          </Form>
          <Form title="옵션 리스트">
            <div className="scrollable">
              {Options !== undefined &&
                Options.map((option, index) => (
                  <div className="common-item" key={index}>
                    {option}
                    <DeleteButtonTrash
                      text="X"
                      onClick={() => handleOptionDelete(index)}
                    />
                  </div>
                ))}
            </div>
          </Form>
        </>
      )}
      <Form>
        <BlueButtonComponent text="선물 추가" onClick={handleGiftAdd} />
      </Form>
      <Form title="선물 리스트">
        <div className="scrollable">
          {reward_list.length > 0 &&
            reward_list.map((gift, index) => (
              <div className="common-item" key={gift.id}>
                {`${gift.name} (${
                  gift.OptionList &&
                  gift.OptionList.length > 0 &&
                  gift.OptionList.join(", ")
                })`}
                <DeleteButtonTrash
                  text="X"
                  onClick={() => handleGiftDelete(gift.id, index)}
                />
              </div>
            ))}
        </div>
      </Form>
    </div>
  );
};

export default GiftConfig;
