import { BlueButtonComponent } from "components/common/ButtonComponent";

const PackageList = (props) => {
  const { project_package, handleEdit, handleConfigDelete } = props;

  const formatQunatity = (quantity) => {
    return quantity === 0 ? "무제한" : `${quantity}개 남음`;
  };
  return (
    <div>
      <h3>내가 만든 선물구성</h3>
      <div className="scrollable" style={{ height: "80%" }}>
        {project_package.length > 0 ? (
          project_package.map((config, index) => (
            <div key={index} className="package-card">
              <div className="quantity-box">
                {formatQunatity(config.quantityLimited)}
              </div>
              <h3>{config.name}</h3>
              <h3> {config.price.toLocaleString()} 원</h3>

              <div className="reward-list">
                {config.RewardList.map((reward, rewardIndex) => (
                  <div key={rewardIndex}>
                    <div className="reward-info">
                      {reward.name}
                      <p className="quantity-box">{reward.count}개</p>
                    </div>
                    <ul>
                      {reward.OptionList.map((opt, optIndex) => (
                        <li key={optIndex}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="button-group">
                <BlueButtonComponent
                  text="수정"
                  onClick={() => handleEdit(index)}
                />
                <BlueButtonComponent
                  text="삭제"
                  onClick={() => handleConfigDelete(config.id, index)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>추가된 선물 구성이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PackageList;
