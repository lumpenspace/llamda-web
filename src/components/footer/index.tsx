const FooterLink = ({ href, children }) => (
  <a className="text-green-500 hover:bg-green-600 hover:text-white" target='_blank' href={href}>
    {children}
  </a>
)

const Footer = () =>
  <div className="w-full z-10 fixed flex flex-row bottom-0 left-0 justify-between font-mono mix-blend-exclusion ">
    llamda, inc | 2024
    <div className='text-right'>
      <FooterLink href="mailto: claude-at-llamda.com"> mail </FooterLink>|
      <FooterLink href="https://x.com/lumpenspace"> x </FooterLink>|
      <FooterLink href="https://substack.com/lumpenspace"> substack </FooterLink>|
      <FooterLink href="https://github.com/lumpenspace"> github </FooterLink>
    </div>
  </div>

export {Footer}