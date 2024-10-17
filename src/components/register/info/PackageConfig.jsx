import { BlueButtonComponent } from "components/common/ButtonComponent";
import Form from "./Form";
import { InputBox } from "components/common/InputBoxComponent";
import { DropdownComponent } from "components/common/DropdownComponent";
import { DeleteButtonTrash } from "components/common/Gift/DeleteButtons";

const PackageConfig = (props) => {
  const {
    package_name,
    setPackage_name,
    reward_list,
    handleSelectReward,
    selected_reward,
    handleCount,
    handleSelectedGiftDelete,
    setIsLimitEnabled,
    isLimitEnabled,
    handleCountChange,
    package_limit,
    package_price,
    setPackage_price,
    isEditing,
    handleConfigAdd,
  } = props;
  return (
    <div className="text-section">
      <h3>선물 구성</h3>
      <Form title={"구성 이름"}>
        <InputBox
          label=""
          value={package_name}
          onChange={(e) => setPackage_name(e.target.value)}
          tooltip={"선물 구성 이름을 적어주세요."}
        />
      </Form>
      <Form title={"선물 선택"}>
        <DropdownComponent
          name={""}
          inputLabel={""}
          menuItems={reward_list.map((gift) => gift.name)}
          onChange={(e) => handleSelectReward(e.target.value)}
        />
      </Form>
      <Form title={"선택된 선물"}>
        <div className="scrollable">
          {selected_reward && (
            <div>
              {selected_reward.map((reward, index) => (
                <div key={index} className="button-group">
                  <span>{reward.name}</span>
                  <div
                    className="count-box"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <BlueButtonComponent
                      text="-"
                      onClick={() => handleCount(reward.name, -1)}
                      disabled={reward.count <= 1}
                    />
                    <input
                      className="count-input"
                      value={reward.count}
                      onChange={(e) => {
                        const value = Math.max(1, Number(e.target.value)); // 최소 1로 제한
                        handleCount(reward.name, value - reward.count); // 카운트 차이를 반영
                      }}
                    />
                    <BlueButtonComponent
                      text="+"
                      onClick={() => handleCount(reward.name, 1)}
                    />
                  </div>
                  <DeleteButtonTrash
                    text="X"
                    onClick={() => handleSelectedGiftDelete(reward.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Form>

      <Form title={"제한 수량"}>
        <div className="button-group">
          <BlueButtonComponent
            text="없음"
            onClick={() => setIsLimitEnabled(false)}
          />
          <BlueButtonComponent
            text="있음"
            onClick={() => setIsLimitEnabled(true)}
          />
          {isLimitEnabled && (
            <div className="count-box">
              <BlueButtonComponent
                text="-"
                onClick={() => handleCountChange(-1)}
                disabled={package_limit <= 0}
              />
              <input
                className="count-input"
                value={package_limit}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value)); // 최소 0으로 제한
                  handleCountChange(value - package_limit); // 카운트 차이를 반영
                }}
              />
              <BlueButtonComponent
                text="+"
                onClick={() => handleCountChange(1)}
              />
            </div>
          )}
        </div>
      </Form>

      <Form title={"가격"}>
        <InputBox
          label=""
          value={package_price + "원"}
          onChange={(e) =>
            setPackage_price(
              e.target.value
                .replace(/[^\d]/g, "") //이전 상태에 쉼표가 포함됨 -> 쉼표 제거
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            )
          }
          tooltip={"선물 구성의 가격을 입력하세요."}
        />
      </Form>
      <Form>
        <BlueButtonComponent
          text={isEditing ? "구성 수정" : "구성 추가"}
          onClick={handleConfigAdd}
        />
      </Form>
    </div>
  );
};

export default PackageConfig;
