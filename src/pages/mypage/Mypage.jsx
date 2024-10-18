import { Layout } from 'components/layout/DamDdaContainer';
import { UserMyPage } from 'components/mypage/UserMyPage';

export const Mypage = () => {
    // const { user } = useUser();

    return (
        <div style={{ width: '100%' }}>
            <Layout>
                <div style={{ width: '100%' }}>
                    <UserMyPage style={{ width: '100%' }} />
                </div>
            </Layout>
        </div>
    );
};
