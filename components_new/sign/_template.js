export const template = () => `
<form class="form form-registration" name="sign">
    <div class="modal blocked fade-in-parent-ftop" name="blocked">
        <div class="container"></div>
    </div>
    <div class="modal success fade-in-parent-ftop" name="success">
        <div class="container" t="promo_all.registration.success_html"></div>
        <a t="promo_all.registration.start_trading"></a>
    </div>
    <div class="fieldset fade-in-parent-fbot">
        <div class="form-group currency-group">
            <div class="group-title" t="promo.registration.choose_currency"></div>
            <div class="currencies"></div>
        </div>
        <div class="form-group email-group">
            <label class="email-label field" name="email">
                <div class="tooltip-container">
                    <div class="tooltip"></div>
                </div>
                <input name="email" type="email" placeholder="example@mail.com" />
            </label>
        </div>
        <div class="form-group password-group">
            <label class="password-label field" name="password">
                <div class="tooltip-container">
                    <div class="tooltip"></div>
                </div>
                <div class="helper"></div>
                <input name="password" type="password" placeholder="•••••••" />
            </label>
        </div>
        <div class="form-group submit-group">
            <button class="submit" t="promo.registration.sign_up"></button>
            <div class="g-recaptcha-response"></div>
        </div>
        <div class="form-group agreement-group">
            <label class="agreement-label field" name="i_agree">
                <div class="tooltip-container">
                    <div class="tooltip"></div>
                </div>
                <div class="agreement">
                    <input name="i_agree" type="checkbox" /><span class="custom-check"></span><span class="description"><span t="promo.registration.i_agree"></span> <a href="/information/agreement"><span t="promo.registration.agreement"></span></a> <span t="promo.registration.and"></span> <a href="/information/privacy"><span t="promo.registration.privacy"></span></a></span>
                </div>
            </label>
        </div>
    </div>
</form>
<form class="form form-registration" name="partner-signUp">
    <div class="modal blocked fade-in-parent-ftop" name="blocked">
        <div class="container"></div>
    </div>
    <div class="modal success fade-in-parent-ftop" name="success">
        <div class="container" t="promo_all.registration.success_html"></div>
        <a t="promo_all.registration.start_trading"></a>
    </div>
    <div class="fieldset fade-in-parent-fbot">
        <div class="form-group currency-group">
            <div class="group-title" t="promo.registration.choose_currency"></div>
            <div class="currencies"></div>
        </div>
        <div class="form-group email-group">
            <label class="email-label field" name="email">
                <div class="tooltip-container">
                    <div class="tooltip"></div>
                </div>
                <input name="email" type="email" placeholder="example@mail.com" />
            </label>
        </div>
        <div class="form-group password-group">
            <label class="password-label field" name="password">
                <div class="tooltip-container">
                    <div class="tooltip"></div>
                </div>
                <div class="helper"></div>
                <input name="password" type="password" placeholder="•••••••" />
            </label>
        </div>
        <div class="form-group submit-group">
            <button class="submit" t="promo.registration.sign_up"></button>
            <div class="g-recaptcha-response"></div>
        </div>
        <div class="form-group agreement-group">
            <label class="agreement-label field" name="i_agree">
                <div class="tooltip-container">
                    <div class="tooltip"></div>
                </div>
                <div class="agreement">
                    <input name="i_agree" type="checkbox" /><span class="custom-check"></span><span class="description"><span t="promo.registration.i_agree"></span> <a href="/information/agreement"><span t="promo.registration.agreement"></span></a> <span t="promo.registration.and"></span> <a href="/information/privacy"><span t="promo.registration.privacy"></span></a></span>
                </div>
            </label>
        </div>
    </div>
</form>
`;
